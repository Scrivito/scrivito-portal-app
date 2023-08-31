// @rewire

import {
  AuthorizationProvider,
  requestApiIdempotent,
  requestApiNonIdempotent,
} from 'scrivito_sdk/client';
import { fetchToRawResponse } from 'scrivito_sdk/client/fetch_to_raw_response';
import { Deferred } from 'scrivito_sdk/common';

let authProvider: AuthorizationProvider | undefined;

export function setJrRestApiAuthProvider(
  provider: AuthorizationProvider
): void {
  authProvider = provider;
}

// For test purpose only
export function getJrRestApiAuthProvider(): AuthorizationProvider | undefined {
  return authProvider;
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
  authProvider = undefined;
  endpointDeferred = new Deferred();
}

interface Options {
  params?: Params;
  data?: Data;
}

interface Params {
  [name: string]: string | null | undefined;
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

// exported for test purposes only
export async function get(
  path: string,
  options?: Options,
  withLoginRedirect = true
): Promise<unknown> {
  return request('GET', path, options, withLoginRedirect);
}

export async function getWithoutLoginRedirect(
  path: string,
  options?: Options
): Promise<unknown> {
  return get(path, options, false);
}

async function post(path: string, options?: Options): Promise<unknown> {
  return request('POST', path, options);
}

async function put(path: string, options?: Options): Promise<unknown> {
  return request('PUT', path, options);
}

async function patch(path: string, options?: Options): Promise<unknown> {
  return request('PATCH', path, options);
}

async function _delete(path: string, options?: Options): Promise<unknown> {
  return request('DELETE', path, options);
}

async function request(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  options?: Options,
  withLoginRedirect = true
) {
  const plainRequest = async (authorization?: string) =>
    fetchToRawResponse(
      await calculateRequestUrl(path, options?.params),
      calculateOptions(method, options?.data, authorization)
    );

  const currentAuthProvider = authProvider;

  const doRequest = currentAuthProvider
    ? () => currentAuthProvider.authorize(plainRequest)
    : () => plainRequest();

  return method === 'POST'
    ? requestApiNonIdempotent(doRequest, withLoginRedirect)
    : requestApiIdempotent(doRequest, withLoginRedirect);
}

async function calculateRequestUrl(path: string, params?: Params) {
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

function calculateOptions(
  method: string,
  data?: Data,
  authorization?: string
): RequestInit {
  const headers: Record<string, string> = {};

  if (data) {
    headers['Content-Type'] = 'application/json; charset=utf-8';
  }

  if (authorization) {
    headers.Authorization = authorization;
  }

  return {
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
    headers,
    method,
  };
}
