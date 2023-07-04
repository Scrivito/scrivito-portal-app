// @rewire

import {
  requestApiIdempotent,
  requestApiNonIdempotent,
} from 'scrivito_sdk/client';
import { fetchToRawResponse } from 'scrivito_sdk/client/fetch_to_raw_response';
import { Deferred } from 'scrivito_sdk/common';

export type TokenProvider = () => Promise<string | undefined>;

let tokenProvider: TokenProvider | undefined;

export function setJrRestApiTokenProvider(provider: TokenProvider): void {
  tokenProvider = provider;
}

// For test purpose only
export function getJrRestApiTokenProvider(): TokenProvider | undefined {
  return tokenProvider;
}

export function isJrRestApiConfiguredForUi(): boolean {
  return !!tokenProvider;
}

let endpointDeferred = new Deferred<string>();

export function getJrRestApiEndpoint(): Promise<string> {
  return endpointDeferred.promise;
}

export function setJrRestApiEndpoint(endpoint: string): void {
  endpointDeferred.resolve(endpoint);
}

export async function getJrRestApiUrl(path: string): Promise<string> {
  return `${await getJrRestApiEndpoint()}/${path}`;
}

// For test purpose only.
export function resetJrRestApi(): void {
  tokenProvider = undefined;
  endpointDeferred = new Deferred();
}

interface Options {
  params?: Params;
  data?: Data;
}

interface Params {
  [name: string]: string;
}

interface Data {
  [name: string]: unknown;
}

type Method =
  | 'delete'
  | 'get'
  | 'patch'
  | 'post'
  | 'put'
  | 'DELETE'
  | 'GET'
  | 'PATCH'
  | 'POST'
  | 'PUT';

/** @public */
export const JrRestApi = {
  delete: _delete,
  fetch,
  get,
  patch,
  post,
  put,
};

function fetch(
  path: string,
  { method, ...otherOptions }: { method?: Method } & Options = {}
): Promise<unknown> {
  const apiMethod: Method = method || 'get';

  return JrRestApi[apiMethod.toLowerCase() as Lowercase<Method>](
    path,
    otherOptions
  );
}

async function get(path: string, options?: Options): Promise<unknown> {
  const url = await calculateRequestUrl(path, options?.params);
  const fetchOptions = await calculateOptions();

  return requestApiIdempotent(() =>
    fetchToRawResponse(url, { method: 'GET', ...fetchOptions })
  );
}

export async function getWithoutLoginRedirect(
  path: string,
  options?: Options
): Promise<unknown> {
  const url = await calculateRequestUrl(path, options?.params);
  const fetchOptions = await calculateOptions();

  return requestApiIdempotent(
    () => fetchToRawResponse(url, { method: 'GET', ...fetchOptions }),
    false
  );
}

async function post(path: string, options?: Options): Promise<unknown> {
  const url = await calculateRequestUrl(path, options?.params);
  const fetchOptions = await calculateOptionsWithData(options?.data);

  return requestApiNonIdempotent(() =>
    fetchToRawResponse(url, { method: 'POST', ...fetchOptions })
  );
}

async function put(path: string, options?: Options): Promise<unknown> {
  return requestIdempotentWithData('PUT', path, options);
}

async function patch(path: string, options?: Options): Promise<unknown> {
  return requestIdempotentWithData('PATCH', path, options);
}

async function _delete(path: string, options?: Options): Promise<unknown> {
  return requestIdempotentWithData('DELETE', path, options);
}

async function requestIdempotentWithData(
  method: string,
  path: string,
  options?: Options
) {
  const url = await calculateRequestUrl(path, options?.params);
  const fetchOptions = await calculateOptionsWithData(options?.data);

  return requestApiIdempotent(() =>
    fetchToRawResponse(url, { method, ...fetchOptions })
  );
}

async function calculateRequestUrl(path: string, params: Params | undefined) {
  const apiUrl = new URL(await getJrRestApiUrl(path));

  if (params) {
    for (const [name, value] of Object.entries(params)) {
      apiUrl.searchParams.append(name, value);
    }
  }

  return apiUrl.toString();
}

async function calculateOptions(headers: Record<string, string> = {}) {
  if (tokenProvider) {
    const token = await tokenProvider();

    if (token !== undefined) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const options: RequestInit = { credentials: 'include', headers };

  return options;
}

async function calculateOptionsWithData(data: Data | undefined) {
  const options = await calculateOptions({
    'Content-Type': 'application/json; charset=utf-8',
  });

  return data ? { body: JSON.stringify(data), ...options } : options;
}
