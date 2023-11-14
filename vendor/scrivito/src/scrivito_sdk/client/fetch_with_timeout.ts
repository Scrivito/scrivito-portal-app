import { RequestFailedError } from 'scrivito_sdk/client';
import { setTimeout } from 'scrivito_sdk/common';

/**
 * Does a [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) request with the
 * given option, adds a timeout of 15s
 */
export async function fetchWithTimeout(
  resource: string,
  options?: Omit<RequestInit, 'signal'>
): Promise<Response> {
  const abortController = new AbortController();
  const timer = setTimeout(() => abortController.abort(), 15000);

  const fetchOptions: RequestInit = options || {};
  fetchOptions.signal = abortController.signal;

  try {
    return await fetch(resource, fetchOptions);
  } catch (error) {
    throw new RequestFailedError(error instanceof Error ? error.message : '');
  } finally {
    clearTimeout(timer);
  }
}
