import { ClientError } from 'scrivito_sdk/client';

export type LoginHandler<T = unknown> = (visit: string) => Promise<T>;

/** execute the function fn and use loginHandler in case of "auth missing" */
export async function withLoginHandler<T, S>(
  loginHandler: LoginHandler<T> | undefined,
  fn: () => Promise<S>
): Promise<T | S> {
  if (!loginHandler) return fn();

  try {
    return await fn();
  } catch (error: unknown) {
    if (loginHandler && isAuthError(error)) {
      return loginHandler(error.details.visit);
    }

    throw error;
  }
}

export type AuthErrorCode =
  | typeof ERROR_CODE_AUTH_CHECK_REQUIRED
  | typeof ERROR_CODE_AUTH_MISSING;

export const ERROR_CODE_AUTH_CHECK_REQUIRED = 'auth_check_required';
export const ERROR_CODE_AUTH_MISSING = 'auth_missing';

export function isAuthError(error: unknown): error is AuthError {
  return (
    error instanceof ClientError &&
    (error.code === ERROR_CODE_AUTH_MISSING ||
      error.code === ERROR_CODE_AUTH_CHECK_REQUIRED) &&
    'visit' in error.details &&
    typeof error.details.visit === 'string'
  );
}

interface AuthError extends ClientError {
  details: { visit: string };
}
