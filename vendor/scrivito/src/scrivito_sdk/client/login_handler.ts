import { ClientError } from 'scrivito_sdk/client';

export type LoginHandler = (visit: string) => Promise<unknown>;

/** execute the function fn and use loginHandler in case of "auth missing" */
export async function withLoginHandler(
  loginHandler: LoginHandler | undefined,
  fn: () => Promise<unknown>
): Promise<unknown> {
  if (!loginHandler) return fn();

  try {
    return await fn();
  } catch (error: unknown) {
    if (loginHandler && isAuthMissingClientError(error)) {
      return loginHandler(error.details.visit);
    }

    throw error;
  }
}

function isAuthMissingClientError(error: unknown): error is AuthMissingError {
  return (
    error instanceof ClientError &&
    error.code === 'auth_missing' &&
    'visit' in error.details &&
    typeof error.details.visit === 'string'
  );
}

interface AuthMissingError extends ClientError {
  details: { visit: string };
}
