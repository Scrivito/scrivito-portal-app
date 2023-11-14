import { UserData } from 'scrivito_sdk/app_support/user';
import { AuthorizationProvider } from 'scrivito_sdk/client';

export interface AuthHandler {
  getUserData(): UserData | undefined;
  isUserLoggedIn(): boolean;
  ensureUserIsLoggedIn(): void;
  iamAuthProvider(): AuthorizationProvider | undefined;
  loginHandler(): undefined | 'redirect';
}
