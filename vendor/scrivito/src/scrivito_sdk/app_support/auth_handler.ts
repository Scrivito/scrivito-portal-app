import { UserData } from 'scrivito_sdk/app_support/user';
import { TokenFetcher } from 'scrivito_sdk/client';

export interface EnsureUserIsLoggedInParams {
  idp?: string;
}

export interface AuthHandler {
  getUserData(): UserData | undefined;
  isUserLoggedIn(): boolean;
  ensureUserIsLoggedIn(params: EnsureUserIsLoggedInParams): void;
  iamTokenFetcher(): TokenFetcher | undefined;
  loginHandler(): undefined | 'redirect';
}
