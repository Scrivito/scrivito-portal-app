import { getEditorAuthToken } from 'scrivito_sdk/app_support//get_editor_auth_token';
import { AuthHandler } from 'scrivito_sdk/app_support/auth_handler';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { assumePresence } from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';

export const insideUiAuthHandler: AuthHandler = {
  getUserData() {
    const userData = assumePresence(uiAdapter).currentEditor();
    if (!userData) return;

    return { ...userData, id: userData.id.replace(/^scrivito:/, '') };
  },

  isUserLoggedIn() {
    return true;
  },

  ensureUserIsLoggedIn() {
    // nothing to do, the user is always logged in inside the UI
  },

  iamTokenFetcher() {
    return async (params) =>
      assumePresence(await load(() => getEditorAuthToken(params)));
  },

  loginHandler() {
    return undefined;
  },
};
