import { AuthorizationProvider } from 'scrivito_sdk/client';
import { FetchData } from 'scrivito_sdk/client/api_client';
import { fetchWithTimeout } from 'scrivito_sdk/client/fetch_with_timeout';
import {
  requestApiIdempotent,
  requestApiNonIdempotent,
} from 'scrivito_sdk/client/request_api';

interface FetchApiOptions extends RequestInit {
  authProvider?: AuthorizationProvider;
  data?: FetchData;
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

  const plainRequest = (authorization?: string) =>
    fetchWithTimeout(
      url,
      authorization
        ? {
            ...options,

            headers: { ...options?.headers, Authorization: authorization },
            credentials: 'omit',
          }
        : { ...options, credentials: 'include' }
    );

  const authProvider = options?.authProvider;
  const authorizedRequest = authProvider
    ? () => authProvider.authorize(plainRequest)
    : plainRequest;

  const isIdempotent = options?.isIdempotent ?? options?.method !== 'POST';

  return isIdempotent
    ? requestApiIdempotent(authorizedRequest)
    : requestApiNonIdempotent(authorizedRequest);
}
