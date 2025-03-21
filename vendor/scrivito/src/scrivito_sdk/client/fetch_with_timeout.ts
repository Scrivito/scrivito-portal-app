import { RequestFailedError } from 'scrivito_sdk/client';
import { setTimeout } from 'scrivito_sdk/common';

/**
 * Does a [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) request with the
 * given option, adds a timeout of 15s
 */
export async function fetchWithTimeout(
  resource: string,
  options?: Readonly<Omit<RequestInit, 'signal'>>
): Promise<Response> {
  const abortController = new AbortController();
  const timer = setTimeout(() => abortController.abort(), 15000);
  const fetchOptions = { ...options, signal: abortController.signal };

  try {
    return await fetch(resource, fetchOptions);
  } catch (error) {
    throw new RequestFailedError(getErrorMessage(error), {
      url: resource,
      method: options?.method || 'GET',
    });
  } finally {
    clearTimeout(timer);
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (isErrorWithCause(error)) {
      return `${error.message}. ${String(error.cause)}`;
    }

    return error.message;
  }

  return '';
}

interface ErrorWithCause extends Error {
  readonly cause?: Error;
}

function isErrorWithCause(error: Error): error is ErrorWithCause {
  return 'cause' in error && error.cause instanceof Error;
}
