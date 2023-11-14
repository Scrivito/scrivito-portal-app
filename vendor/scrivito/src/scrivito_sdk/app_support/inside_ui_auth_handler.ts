import { AuthHandler } from 'scrivito_sdk/app_support/auth_handler';
import { currentEditor } from 'scrivito_sdk/app_support/current_editor';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { TokenAuthorizationProvider } from 'scrivito_sdk/client';
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

  iamAuthProvider() {
    return new TokenAuthorizationProvider(async () =>
      assumePresence(await load(() => currentEditor()?.authToken()))
    );
  },

  loginHandler() {
    return undefined;
  },
};
