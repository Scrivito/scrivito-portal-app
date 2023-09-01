import { RawResponse, RequestFailedError } from 'scrivito_sdk/client';

/**
 * Does a [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) request with the
 * given option, adds a timeout of 15s and converts the result to a `RawResponse`.
 */
export async function fetchToRawResponse(
  resource: string,
  options?: Omit<RequestInit, 'signal'>
): Promise<RawResponse> {
  let response: Response;

  const abortController = new AbortController();
  const timer = setTimeout(() => abortController.abort(), 15000);

  const fetchOptions: RequestInit = options || {};
  fetchOptions.signal = abortController.signal;

  try {
    response = await fetch(resource, fetchOptions);
    clearTimeout(timer);
  } catch (error) {
    throw new RequestFailedError(error instanceof Error ? error.message : '');
  }

  const httpStatus = response.status;
  const responseText = await response.text();

  const retryAfterHeader =
    // the CMS backend allows access to Retry-After only on a 429 response
    (httpStatus === 429 && response.headers.get('Retry-After')) || undefined;

  return { httpStatus, responseText, retryAfterHeader };
}
