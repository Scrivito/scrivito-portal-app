import {
  getTokenProvider,
  loginRedirectHandler,
  withLoginHandler,
} from 'scrivito_sdk/client';
import { ResultOrFail } from 'scrivito_sdk/client/token_authorization_provider';

/** @public */
export async function performWithIamToken<T>(
  audience: string,
  callback: (token: string) => Promise<ResultOrFail<T>>
): Promise<T> {
  return withLoginHandler(loginRedirectHandler, () =>
    getTokenProvider({ audience }).authorizeAbstract(callback)
  );
}
