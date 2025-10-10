import {
  LoginHandler,
  clientConfig,
  getTokenProvider,
} from 'scrivito_sdk/client';
import {
  ApiClient,
  ApiClientHeaders,
  ApiClientOptions,
  FetchOptions,
} from 'scrivito_sdk/client/api_client';
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
    idp,
    method: verb,
    params,
    authViaAccount,
    authViaInstance,
    credentials,
  }: FetchOptions = {}
) {
  const method = verb?.toUpperCase() ?? 'GET';
  const authorization =
    headers && 'Authorization' in headers ? headers.Authorization : undefined;

  const authProvider = calculateAuthProvider({
    url,
    authorization,
    audience,
    authViaAccount,
    authViaInstance,
  });

  const fetchFn = () =>
    fetchJson(url, {
      data,
      authProvider,
      headers: removeNullValues(headers),
      skipAuthorization: authorization === null,
      params,
      method,
      credentials,
    });

  if (authorization !== undefined) return fetchFn();

  if (method === 'GET') {
    return withLoginHandler(
      await calculateLoginHandler({ loginHandler, idp }),
      fetchFn
    );
  }

  return fetchFn();
}

async function calculateLoginHandler({
  loginHandler,
  idp,
}: {
  loginHandler?: LoginHandler;
  idp?: string;
}) {
  if (loginHandler) return loginHandler;

  if ((await clientConfig.fetch()).loginHandler !== 'redirect') return;

  return (visit: string) => loginRedirectHandler(visit, idp);
}

function calculateAuthProvider({
  url,
  authorization,
  audience,
  authViaAccount,
  authViaInstance,
}: {
  url: string;
  authorization?: string | null;
  audience?: string;
  authViaAccount?: string;
  authViaInstance?: string;
}) {
  if (authorization !== undefined) return;

  return getTokenProvider({
    audience: audience || new URL(url).origin,
    ...(authViaAccount && { authViaAccount }),
    ...(authViaInstance && { authViaInstance }),
  });
}

function removeNullValues(headers: ApiClientHeaders = {}) {
  return Object.fromEntries(
    Object.entries(headers).filter(([, v]) => v !== null)
  );
}
