import { BrowserTokenParams } from 'scrivito_sdk/client';
import { joinPaths } from 'scrivito_sdk/client/join_paths';
import { ConfigStore, InternalError } from 'scrivito_sdk/common';

export interface FetchedToken {
  token: string;
  expiresAt: Date;
}

export function toFetchedToken(response: unknown): FetchedToken {
  assertTokenResponse(response);

  const { access_token: token, expires_in: expiresIn } = response;

  return { token, expiresAt: new Date(Date.now() + expiresIn * 1000) };
}

function assertTokenResponse(
  response: unknown,
): asserts response is { access_token: string; expires_in: number } {
  if (
    response &&
    typeof response === 'object' &&
    'access_token' in response &&
    typeof response.access_token === 'string' &&
    'expires_in' in response &&
    typeof response.expires_in === 'number'
  ) {
    return;
  }

  throw new InternalError(JSON.stringify(response));
}

export type TokenFetcher = (
  params: BrowserTokenParams,
) => Promise<FetchedToken | null>;

interface ClientConfig {
  iamAuthLocation?: string;
  iamTokenFetcher?: TokenFetcher;
  loginHandler?: 'redirect' | 'error';
}

export const clientConfig = new ConfigStore<ClientConfig>();

export async function getIamAuthUrl(path = ''): Promise<string> {
  const iamAuthLocation = (await clientConfig.fetch()).iamAuthLocation;
  if (!iamAuthLocation) throw new InternalError();

  return joinPaths(iamAuthLocation, path);
}
