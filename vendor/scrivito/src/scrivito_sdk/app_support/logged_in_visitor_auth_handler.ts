import { AuthHandler } from 'scrivito_sdk/app_support/auth_handler';
import { changeLoggedInState } from 'scrivito_sdk/app_support/logged_in_state';
import { getOfflineMode } from 'scrivito_sdk/app_support/offline_mode';
import { getUserInfo } from 'scrivito_sdk/app_support/user_info';
import { startPollingLoggedInUser } from 'scrivito_sdk/app_support/user_logged_in_status';
import { wait } from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';

export const loggedInVisitorAuthHandler: AuthHandler = {
  getUserData() {
    const userInfo = getUserInfo();
    if (!userInfo) return;

    const { sub: id, name, email, picture } = userInfo;

    return { id, name, email, picture: picture || null };
  },

  isUserLoggedIn() {
    verifyUserIsLoggedIn();

    if (!getOfflineMode()) startPollingLoggedInUser();

    return true;
  },

  ensureUserIsLoggedIn() {
    // nothing to do, we are logged in already
  },

  iamTokenFetcher() {
    return undefined;
  },

  loginHandler() {
    return 'redirect';
  },
};

async function verifyUserIsLoggedIn() {
  const user = await Promise.race([
    load(loggedInVisitorAuthHandler.getUserData),
    wait(30),
  ]);

  if (!user) changeLoggedInState(false);
}
