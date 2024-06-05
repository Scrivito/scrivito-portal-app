import { clientConfig } from 'scrivito_sdk/client';
import {
  ApiClient,
  ApiClientOptions,
  FetchOptions,
} from 'scrivito_sdk/client/api_client';
import { getBrowserTokenProvider } from 'scrivito_sdk/client/browser_token';
import { fetchJson } from 'scrivito_sdk/client/fetch_json';
import { joinPaths } from 'scrivito_sdk/client/join_paths';
import { withLoginHandler } from 'scrivito_sdk/client/login_handler';
import { loginRedirectHandler } from 'scrivito_sdk/client/login_redirect_handler';

/** @public */
export function createRestApiClient(
  baseUrl: string,
  options?: ApiClientOptions
): ApiClient {
  return new ApiClient(
    async (url, fetchOptions?) => fetch(joinPaths(baseUrl, url), fetchOptions),
    options
  );
}

async function fetch(
  url: string,
  {
    audience,
    data,
    headers,
    loginHandler,
    method: verb,
    params,
    unstable_forceCookie,
  }: FetchOptions = {}
) {
  const method = verb?.toUpperCase() ?? 'GET';
  const config = await clientConfig.fetch();

  const handler =
    loginHandler ??
    (config.loginHandler === 'redirect' ? loginRedirectHandler : undefined);

  const authProvider = unstable_forceCookie
    ? undefined
    : config.iamAuthProvider ??
      getBrowserTokenProvider(audience || new URL(url).origin);

  return withLoginHandler(handler, () =>
    fetchJson(url, { data, authProvider, headers, params, method })
  );
}
