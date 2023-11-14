// @rewire

import { clientConfig } from 'scrivito_sdk/client';
import {
  ApiClient,
  FetchOptions,
  FetchParams,
} from 'scrivito_sdk/client/api_client';
import { fetchJson } from 'scrivito_sdk/client/fetch_json';
import { withLoginHandler } from 'scrivito_sdk/client/login_handler';
import { loginRedirectHandler } from 'scrivito_sdk/client/login_redirect_handler';

export async function getJrRestApiUrl(path: string): Promise<string> {
  const sanitizedPath = path.replace(/^\//, '');
  return `${(await clientConfig.fetch()).jrApiLocation}/${sanitizedPath}`;
}

/** @public */
export const JrRestApi = new ApiClient(fetch);

async function fetch(path: string, options?: FetchOptions) {
  const method = options?.method?.toUpperCase() ?? 'GET';
  const config = await clientConfig.fetch();

  const url = await calculateRequestUrl(path, options?.params);

  const loginHandler =
    options?.loginHandler ??
    (config.loginHandler === 'redirect' ? loginRedirectHandler : undefined);

  return withLoginHandler(loginHandler, () =>
    fetchJson(url, {
      data: options?.data,
      authProvider: config.iamAuthProvider,
      method,
    })
  );
}

async function calculateRequestUrl(path: string, params?: FetchParams) {
  const apiUrl = new URL(await getJrRestApiUrl(path));

  if (params) {
    for (const [name, value] of Object.entries(params)) {
      if (typeof value === 'string') {
        apiUrl.searchParams.append(name, value);
      }
    }
  }

  return apiUrl.toString();
}
