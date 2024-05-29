import { AuthHandler } from 'scrivito_sdk/app_support/auth_handler';
import { changeLoggedInState } from 'scrivito_sdk/app_support/logged_in_state';
import { fetchLoggedUser } from 'scrivito_sdk/app_support/user_logged_in_status';

export const anonymousVisitorAuthHandler: AuthHandler = {
  getUserData() {
    return undefined;
  },

  isUserLoggedIn() {
    return false;
  },

  ensureUserIsLoggedIn() {
    ensureUserIsLoggedInAsync();
  },

  iamAuthProvider() {
    return undefined;
  },

  loginHandler() {
    return 'redirect';
  },
};

async function ensureUserIsLoggedInAsync() {
  // If the user isn't logged-in, this triggers a login redirect
  await fetchLoggedUser();
  changeLoggedInState(true);
}
