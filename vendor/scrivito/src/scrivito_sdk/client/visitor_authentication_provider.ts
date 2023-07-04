import { AuthorizationProvider, RawResponse } from 'scrivito_sdk/client';
import { VisitorSession, cmsRestApi } from 'scrivito_sdk/client/cms_rest_api';
import { PublicAuthentication } from 'scrivito_sdk/client/public_authentication';
import {
  Deferred,
  ScrivitoError,
  randomId,
  throwNextTick,
} from 'scrivito_sdk/common';

/**
 * The VisitorAuthenticationProvider is responsible to provide the visitor
 * session to authenticate backend requests for a Scrivito configured with
 * visitor authentication.
 *
 * The visitor session is retrieved from backend using the id token that
 * the provider has received. Backend requests are delayed until the first
 * session response arrives.
 *
 * Responses of visitor session authenticated backend requests are monitored
 * if they indicate an expired session, and retried either with a fresh
 * visitor session or without authentication.
 */
export class VisitorAuthenticationProvider implements AuthorizationProvider {
  private readonly sessionId = randomId();
  private idToken = new Deferred<string>();
  private sessionRequest: Promise<VisitorSession>;
  private state = 'waiting for token';

  constructor() {
    this.sessionRequest = this.fetchSession();
  }

  setToken(token: string) {
    if (!this.idToken.isPending()) {
      this.idToken = new Deferred();
      this.renewSession();
    }
    this.idToken.resolve(token);
    this.state = `active - token: ${token.substr(0, 3)}...`;
  }

  currentState(): string {
    return this.state;
  }

  async authorize(
    request: (authorization: string | undefined) => Promise<RawResponse>
  ): Promise<RawResponse> {
    const sessionRequest = this.sessionRequest;

    let session: VisitorSession;

    try {
      session = await sessionRequest;
    } catch (_error) {
      return PublicAuthentication.authorize(request);
    }

    const response = await request(`Session ${session.token}`);

    if (response.httpStatus === 401) {
      if (this.sessionRequest === sessionRequest) this.renewSession();

      return this.authorize(request);
    }

    return response;
  }

  private renewSession() {
    this.sessionRequest = this.fetchSession();
  }

  private async fetchSession() {
    try {
      const token = await this.idToken.promise;
      return await cmsRestApi.requestVisitorSession(this.sessionId, token);
    } catch (error) {
      throwNextTick(
        new ScrivitoError(
          `Failed to establish visitor session: ${(error as Error).message}`
        )
      );

      throw error;
    }
  }
}
