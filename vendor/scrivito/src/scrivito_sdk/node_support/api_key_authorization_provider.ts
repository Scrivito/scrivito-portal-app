import { AuthorizationProvider, RawResponse } from 'scrivito_sdk/client';

export class ApiKeyAuthorizationProvider implements AuthorizationProvider {
  private readonly authorization: string;

  constructor(apiKey: string) {
    const base64 = Buffer.from(`api_token:${apiKey}`).toString('base64');
    this.authorization = `Basic ${base64}`;
  }

  async authorize(
    request: (auth: string | undefined) => Promise<RawResponse>
  ): Promise<RawResponse> {
    return request(this.authorization);
  }
}
