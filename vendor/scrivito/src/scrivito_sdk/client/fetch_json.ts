import { AuthorizationProvider } from 'scrivito_sdk/client';
import { FetchData, FetchParams } from 'scrivito_sdk/client/api_client';
import { fetchWithTimeout } from 'scrivito_sdk/client/fetch_with_timeout';
import {
  parseResponse,
  throwOnError,
} from 'scrivito_sdk/client/parse_response';
import {
  requestWithRateLimitRetry,
  retryOnRequestFailed,
} from 'scrivito_sdk/client/retry';

interface FetchApiOptions extends RequestInit {
  authProvider?: AuthorizationProvider;
  data?: FetchData | FormData;
  headers?: Record<string, string>;
  params?: FetchParams;
  isIdempotent?: boolean;
  skipAuthorization?: boolean;
}

/** fetch JSON data
 *
 * similar to the native fetch in principle, but with more features:
 * - automatic JSON encoding (returns parsed data)
 * - can use an AuthorizationProvider
 * - automatic retry
 * - throws errors on communication problems (e.g. ClientError for HTTP 400er)
 * - enforces a timeout
 */
export async function fetchJson(
  url: string,
  options?: FetchApiOptions
): Promise<unknown> {
  const data = options?.data;
  if (data) {
    return fetchJson(url, calculateDataFetchOptions(data, options));
  }

  const params = options?.params;
  if (params) {
    return fetchJson(encodeParameters(url, params), {
      ...options,
      params: undefined,
    });
  }

  const authorizedRequest = calculateAuthorizedRequest(url, options);
  const isIdempotent = options?.isIdempotent ?? options?.method !== 'POST';
  const nonIdempotentRequest = async () =>
    parseResponse(
      await throwOnError(await requestWithRateLimitRetry(authorizedRequest), {
        url,
        method: options?.method,
      })
    );

  return isIdempotent
    ? retryOnRequestFailed(nonIdempotentRequest)
    : nonIdempotentRequest();
}

function calculateDataFetchOptions(
  data: FetchData | FormData,
  options: FetchApiOptions
) {
  const isFormData = data instanceof FormData;

  return {
    ...options,
    headers: {
      ...options.headers,
      ...(!isFormData && { 'Content-Type': 'application/json; charset=utf-8' }),
    },
    body: isFormData ? data : JSON.stringify(data),
    data: undefined,
  };
}

function calculateAuthorizedRequest(url: string, options?: FetchApiOptions) {
  const plainRequest = calculatePlainRequest(url, options);
  if (options?.skipAuthorization) return plainRequest;

  const authHeaderToken = options?.headers?.Authorization;
  if (authHeaderToken) return () => plainRequest(authHeaderToken);

  const authProvider = options?.authProvider;
  return authProvider
    ? () => authProvider.authorize(plainRequest)
    : plainRequest;
}

function calculatePlainRequest(url: string, options?: FetchApiOptions) {
  return (authorization?: string) =>
    fetchWithTimeout(url, calculatePlainRequestOptions(authorization, options));
}

function calculatePlainRequestOptions(
  authorization?: string,
  options?: FetchApiOptions
) {
  const credentials = calculateRequestCredentials(authorization, options);

  if (authorization) {
    return {
      ...options,
      headers: { ...options?.headers, Authorization: authorization },
      credentials,
    };
  }

  return { ...options, credentials };
}

function calculateRequestCredentials(
  authorization?: string,
  options?: FetchApiOptions
) {
  const credentials = options?.credentials;
  if (credentials) return credentials;

  return authorization || options?.skipAuthorization ? 'omit' : 'include';
}

function encodeParameters(url: string, params: FetchParams) {
  const apiUrl = new URL(url);

  for (const [name, value] of Object.entries(params)) {
    if (typeof value === 'string') apiUrl.searchParams.append(name, value);
  }

  return apiUrl.toString();
}
