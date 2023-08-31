import type { IamApiKey } from 'scrivito_sdk/app_support/configure';
import {
  AuthorizationProvider,
  RawResponse,
  retryOnRequestFailed,
} from 'scrivito_sdk/client';
import { fetchIamToken } from 'scrivito_sdk/node_support/fetch_iam_token';

export class ApiKeyAuthorizationProvider implements AuthorizationProvider {
  private authorization: string | undefined;

  constructor(readonly apiKey: string | IamApiKey) {}

  async authorize(
    request: (auth: string | undefined) => Promise<RawResponse>
  ): Promise<RawResponse> {
    return retryOnRequestFailed(async () => {
      this.authorization ||= await this.fetchAuth();

      if (!isIamTokenAuth(this.apiKey)) {
        return request(this.authorization);
      }

      const response = await request(this.authorization);

      if (response.httpStatus === 401) {
        this.authorization = undefined;
        return this.authorize(request);
      }

      return response;
    });
  }

  private async fetchAuth() {
    return isIamTokenAuth(this.apiKey)
      ? `Bearer ${await fetchIamToken(this.apiKey)}`
      : `Basic ${btoa(`api_token:${this.apiKey}`)}`;
  }
}

function isIamTokenAuth(apiKey: string | IamApiKey): apiKey is IamApiKey {
  return typeof apiKey !== 'string';
}
