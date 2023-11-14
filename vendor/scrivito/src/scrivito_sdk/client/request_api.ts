import { retryOnRequestFailed } from 'scrivito_sdk/client';
import { parseResponse } from 'scrivito_sdk/client/parse_response';
import { requestWithRateLimitRetry } from 'scrivito_sdk/client/retry';

export function requestApiIdempotent(
  request: () => Promise<Response>
): Promise<unknown> {
  return retryOnRequestFailed(() => requestApiNonIdempotent(request));
}

export async function requestApiNonIdempotent(
  request: () => Promise<Response>
): Promise<unknown> {
  return parseResponse(await requestWithRateLimitRetry(request));
}
