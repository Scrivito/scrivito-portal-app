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
  data?: FetchData;
  headers?: Record<string, string>;
  params?: FetchParams;
  isIdempotent?: boolean;
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
    return fetchJson(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
      data: undefined,
    });
  }

  const params = options?.params;
  if (params) {
    return fetchJson(encodeParameters(url, params), {
      ...options,

      params: undefined,
    });
  }

  const plainRequest = (authorization?: string) =>
    fetchWithTimeout(
      url,
      authorization
        ? {
            ...options,

            headers: { ...options?.headers, Authorization: authorization },
            credentials: options?.credentials ?? 'omit',
          }
        : { ...options, credentials: options?.credentials ?? 'include' }
    );

  const authProvider = options?.authProvider;
  const authorizedRequest = authProvider
    ? () => authProvider.authorize(plainRequest)
    : plainRequest;

  const isIdempotent = options?.isIdempotent ?? options?.method !== 'POST';
  const nonIdempotentRequest = async () =>
    parseResponse(
      await throwOnError(await requestWithRateLimitRetry(authorizedRequest))
    );

  return isIdempotent
    ? retryOnRequestFailed(nonIdempotentRequest)
    : nonIdempotentRequest();
}

function encodeParameters(url: string, params: FetchParams) {
  const apiUrl = new URL(url);

  for (const [name, value] of Object.entries(params)) {
    if (typeof value === 'string') apiUrl.searchParams.append(name, value);
  }

  return apiUrl.toString();
}
