import { UserData } from 'scrivito_sdk/app_support/user';
import { TokenFetcher } from 'scrivito_sdk/client';

export interface AuthHandler {
  getUserData(): UserData | undefined;
  isUserLoggedIn(): boolean;
  ensureUserIsLoggedIn(): void;
  iamTokenFetcher(): TokenFetcher | undefined;
  loginHandler(): undefined | 'redirect';
}
