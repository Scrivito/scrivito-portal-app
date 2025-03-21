import type { IamApiKey } from 'scrivito_sdk/app_support/configure';
import {
  AuthorizationProvider,
  TokenAuthorizationProvider,
} from 'scrivito_sdk/client';
import { fetchIamToken } from 'scrivito_sdk/node_support/fetch_iam_token';

export class ApiKeyAuthorizationProvider implements AuthorizationProvider {
  constructor(apiKey: string | IamApiKey) {
    const authProvider = isIamTokenAuth(apiKey)
      ? new TokenAuthorizationProvider(() => fetchIamToken(apiKey))
      : new LegacyApiKeyAuthorizationProvider(apiKey);

    this.authorize = authProvider.authorize.bind(authProvider);
  }

  authorize: (
    request: (auth: string | undefined) => Promise<Response>
  ) => Promise<Response>;
}

class LegacyApiKeyAuthorizationProvider implements AuthorizationProvider {
  constructor(readonly apiKey: string) {}

  async authorize(
    request: (auth: string | undefined) => Promise<Response>
  ): Promise<Response> {
    return request(`Basic ${btoa(`api_token:${this.apiKey}`)}`);
  }
}

function isIamTokenAuth(apiKey: string | IamApiKey): apiKey is IamApiKey {
  return typeof apiKey !== 'string';
}
