import {
  AuthorizationProvider,
  ClientError,
  ClientErrorRequestDetails,
} from 'scrivito_sdk/client';
import { ExponentialBackoff } from 'scrivito_sdk/client/exponential_backoff';
import { isErrorResponse } from 'scrivito_sdk/client/is_error_response';
import { ERROR_CODE_AUTH_CHECK_REQUIRED } from 'scrivito_sdk/client/login_handler';
import { ScrivitoError, registerAsyncTask } from 'scrivito_sdk/common';

export type ResultOrFail<T> =
  | {
      result: T;
    }
  | {
      authenticationFailed: {
        error: string;
        code: string;
        details?: object;
      };
    };

export class TokenAuthorizationError extends ScrivitoError {
  constructor(
    readonly message: string,
    readonly code: string | undefined,
    readonly httpStatus: number,
    readonly requestDetails: ClientErrorRequestDetails = {}
  ) {
    super(message);
  }
}

export class TokenAuthorizationProvider implements AuthorizationProvider {
  private fetchTokenPromise?: Promise<string | null>;

  constructor(private fetchToken: () => Promise<string | null>) {}

  async authorize(
    request: (auth?: string) => Promise<Response>
  ): Promise<Response> {
    return this.authorizeAbstract<Response>(
      async (auth: string | undefined) => {
        const result = await request(auth ? `Bearer ${auth}` : undefined);

        // IAM always responds with a 401 status code if a new token is needed.
        // Any other status code indicates that something went wrong.
        if (result.status !== 401) return { result };

        const contentType = result.headers.get('content-type');

        if (!contentType?.includes('application/json')) {
          return { authenticationFailed: fallbackErrorResponse() };
        }

        const clonedResponse = result.clone();

        const authenticationFailed = await registerAsyncTask(async () => {
          try {
            // Explicit cast ensures TS infers the return type correctly.
            // Without it, `json()` is typed as any.
            return clonedResponse.json() as Promise<unknown>;
          } catch {
            return Promise.resolve();
          }
        });

        if (
          !isErrorResponse(authenticationFailed) ||
          !authenticationFailed.code
        ) {
          return { authenticationFailed: fallbackErrorResponse() };
        }

        return {
          authenticationFailed: {
            error: authenticationFailed.error,
            code: authenticationFailed.code,
            details: authenticationFailed.details,
          },
        };
      }
    );
  }

  async authorizeAbstract<T>(
    callback: (auth?: string) => Promise<ResultOrFail<T>>
  ): Promise<T> {
    const backoff = new ExponentialBackoff();
    let fetchedTokenBefore = false;

    // note: using a loop instead of recursion avoids stack overflow

    while (true) {
      if (!this.fetchTokenPromise) {
        this.fetchTokenPromise = (async () => {
          if (fetchedTokenBefore) await backoff.nextDelay();
          fetchedTokenBefore = true;

          try {
            return await this.fetchToken();
          } catch (error) {
            if (error instanceof ClientError && error.httpStatus === 404) {
              throw new TokenAuthorizationError(
                error.message,
                error.code,
                error.httpStatus,
                error.requestDetails
              );
            }

            throw error;
          }
        })();
      }

      const tokenPromise = this.fetchTokenPromise;

      const token = await tokenPromise;

      const outcome = token === null ? await callback() : await callback(token);
      if ('result' in outcome) return outcome.result;

      const {
        authenticationFailed: { error, code, details = {} },
      } = outcome;

      if (
        outcome.authenticationFailed.code === ERROR_CODE_AUTH_CHECK_REQUIRED
      ) {
        throw new ClientError(error, code, details);
      }

      // is token renewal already in progress? (concurrency)
      if (tokenPromise === this.fetchTokenPromise) {
        // if not: trigger renewal
        this.fetchTokenPromise = undefined;
      }
    }
  }

  /** for test purposes */
  injectToken(token: string): void {
    this.fetchTokenPromise = Promise.resolve(token);
  }
}

function fallbackErrorResponse() {
  return {
    error: 'authentication invalid',
    code: 'auth_missing',
  };
}
