import {
  AuthHandler,
  EnsureUserIsLoggedInParams,
} from 'scrivito_sdk/app_support/auth_handler';
import { changeLoggedInState } from 'scrivito_sdk/app_support/logged_in_state';
import { fetchLoggedInUser } from 'scrivito_sdk/app_support/user_logged_in_status';

export const anonymousVisitorAuthHandler: AuthHandler = {
  getUserData() {
    return undefined;
  },

  isUserLoggedIn() {
    return false;
  },

  ensureUserIsLoggedIn(params: EnsureUserIsLoggedInParams) {
    ensureUserIsLoggedInAsync(params);
  },

  iamTokenFetcher() {
    return undefined;
  },

  loginHandler() {
    return 'redirect';
  },
};

async function ensureUserIsLoggedInAsync(params: EnsureUserIsLoggedInParams) {
  // If the user isn't logged-in, this triggers a login redirect
  await fetchLoggedInUser(params);
  changeLoggedInState(true);
}
