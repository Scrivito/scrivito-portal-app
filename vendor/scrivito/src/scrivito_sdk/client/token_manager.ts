import { TokenAuthorizationProvider, clientConfig } from 'scrivito_sdk/client';
import {
  BrowserTokenParams,
  fetchBrowserToken,
} from 'scrivito_sdk/client/browser_token';
import { computeCacheKey, onReset } from 'scrivito_sdk/common';

let providerCache: Record<string, TokenAuthorizationProvider | undefined> = {};

export function getTokenProvider(
  params: BrowserTokenParams
): TokenAuthorizationProvider {
  const cacheKey = computeCacheKey(params);

  const cachedProvider = providerCache[cacheKey];
  if (cachedProvider) return cachedProvider;

  const newProvider = new TokenAuthorizationProvider(async () => {
    const { iamTokenFetcher } = await clientConfig.fetch();

    return iamTokenFetcher
      ? iamTokenFetcher(params)
      : fetchBrowserToken(params);
  });

  providerCache[cacheKey] = newProvider;

  return newProvider;
}

/** for test purposes */
export function injectBrowserToken(
  params: BrowserTokenParams,
  token: string
): void {
  getTokenProvider(params).injectToken(token);
}

onReset(() => (providerCache = {}));
