import { AuthorizationProvider } from 'scrivito_sdk/client';
import { ExponentialBackoff } from 'scrivito_sdk/client/exponential_backoff';

export class TokenAuthorizationProvider implements AuthorizationProvider {
  private fetchTokenPromise?: Promise<string | null>;

  constructor(private fetchToken: () => Promise<string | null>) {}

  async authorize(
    request: (auth?: string) => Promise<Response>
  ): Promise<Response> {
    const backoff = new ExponentialBackoff();
    let fetchedTokenBefore = false;

    // note: using a loop instead of recursion avoids stack overflow
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (!this.fetchTokenPromise) {
        this.fetchTokenPromise = (async () => {
          if (fetchedTokenBefore) await backoff.nextDelay();
          fetchedTokenBefore = true;

          return this.fetchToken();
        })();
      }

      const tokenPromise = this.fetchTokenPromise;

      const token = await tokenPromise;
      const response =
        token === null ? await request() : await request(`Bearer ${token}`);

      if (response.status !== 401) return response;

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
