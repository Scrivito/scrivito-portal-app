import { AuthHandler } from 'scrivito_sdk/app_support/auth_handler';
import { getConfiguration } from 'scrivito_sdk/app_support/configure';
import { TokenAuthorizationProvider } from 'scrivito_sdk/client';
import { ScrivitoError } from 'scrivito_sdk/common';
import { fetchIamToken } from 'scrivito_sdk/node_support/fetch_iam_token';

export const nodeAuthHandler: AuthHandler = {
  getUserData() {
    refuse();
  },

  isUserLoggedIn() {
    refuse();
  },

  ensureUserIsLoggedIn() {
    refuse();
  },

  iamAuthProvider() {
    return new TokenAuthorizationProvider(async () => {
      const configuration = await getConfiguration();
      const key = configuration.apiKey;

      return typeof key === 'object' ? fetchIamToken(key) : null;
    });
  },

  loginHandler() {
    return undefined;
  },
};

function refuse(): never {
  throw new ScrivitoError('Only available in browser');
}
