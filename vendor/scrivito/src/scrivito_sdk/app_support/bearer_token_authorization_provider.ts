import type { AuthorizationProvider, RawResponse } from 'scrivito_sdk/client';

export class BearerTokenAuthorizationProvider implements AuthorizationProvider {
  private authorization: string | undefined;

  constructor(readonly tokenPromise: () => Promise<string | undefined>) {}

  async authorize(request: (auth: string | undefined) => Promise<RawResponse>) {
    this.authorization ||= await this.fetchAuth();
    return request(this.authorization);
  }

  private async fetchAuth() {
    const token = await this.tokenPromise();
    if (token) return `Bearer ${token}`;
  }
}
