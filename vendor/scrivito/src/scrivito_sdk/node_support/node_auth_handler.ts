import { AuthHandler } from 'scrivito_sdk/app_support/auth_handler';
import { getConfiguration } from 'scrivito_sdk/app_support/configure';
import { ScrivitoError } from 'scrivito_sdk/common';
import { fetchIamToken } from 'scrivito_sdk/node_support/fetch_iam_token';

export const nodeAuthHandler: AuthHandler = {
  getUserData(): undefined {
    return;
  },

  isUserLoggedIn(): false {
    return false;
  },

  ensureUserIsLoggedIn(): never {
    refuse();
  },

  iamTokenFetcher() {
    return async () => {
      const configuration = await getConfiguration();
      const key = configuration.apiKey;

      return typeof key === 'object' ? fetchIamToken(key) : null;
    };
  },

  loginHandler(): undefined {
    return;
  },
};

function refuse(): never {
  throw new ScrivitoError('Only available in browser');
}
