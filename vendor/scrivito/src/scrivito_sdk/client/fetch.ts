// @rewire
import { RequestFailedError } from 'scrivito_sdk/client';
import { getClientVersion } from 'scrivito_sdk/client/get_client_version';
import { ScrivitoPromise } from 'scrivito_sdk/common';

export interface FetchOptions {
  params?: unknown;
  authorization?: string;
  forceVerification?: boolean;
  priority?: Priority;
}

export type Priority = 'foreground' | 'background';

let connectionCounter = 0;

// For test purpose only
export function isFetchingActive(): boolean {
  return connectionCounter > 0;
}

let xmlHttpRequest: undefined | typeof XMLHttpRequest;

export function useXmlHttpRequest(xhr?: typeof XMLHttpRequest): void {
  xmlHttpRequest = xhr;
}

let fallbackPriority: undefined | Priority;

export function useDefaultPriority(priority: Priority) {
  fallbackPriority = priority;
}

export function fetch(
  method: string,
  url: string,
  { params, authorization, priority, forceVerification }: FetchOptions
): Promise<XMLHttpRequest> {
  if (xmlHttpRequest === undefined) {
    return ScrivitoPromise.resolve({
      status: 432,
      responseText: JSON.stringify({
        error: 'Forbidden',
        code: 'auth_missing',
        details: { visit: 'example.com' },
      }),
    } as XMLHttpRequest);
  }

  connectionCounter += 1;

  return new ScrivitoPromise(
    (
      resolve: (v: XMLHttpRequest) => void,
      reject: (e: Error) => void
    ): void => {
      const request = createRequestObj(method, url, resolve, reject);
      if (authorization) {
        request.setRequestHeader('Authorization', authorization);
      }

      request.setRequestHeader('Scrivito-Client', getClientVersion());

      if (forceVerification) {
        request.setRequestHeader('Scrivito-Force-Verification', 'true');
      }

      const priorityWithFallback = priority || fallbackPriority;
      if (priorityWithFallback === 'background') {
        request.setRequestHeader('Scrivito-Priority', priorityWithFallback);
      }

      request.setRequestHeader(
        'Content-type',
        'application/json; charset=utf-8'
      );
      request.send(JSON.stringify(params));
    }
  );
}

function createRequestObj(
  method: string,
  url: string,
  resolve: (v: XMLHttpRequest) => void,
  reject: (e: Error) => void
) {
  const request = new xmlHttpRequest!();

  request.open(method === 'POST' ? 'POST' : 'PUT', url);

  request.timeout = 15000;
  request.withCredentials = true;

  request.onload = () => onAjaxLoad(request, resolve, reject);

  function handleError(message: string) {
    onAjaxError(new RequestFailedError(message), reject);
  }

  request.onerror = () => handleError('XMLHttpRequest Error');
  request.ontimeout = () => handleError('XMLHttpRequest Timeout');
  request.onabort = () => handleError('XMLHttpRequest Aborted');

  return request;
}

function onAjaxLoad(
  request: XMLHttpRequest,
  resolve: (v: XMLHttpRequest) => void,
  reject: (e: Error) => void
) {
  connectionCounter -= 1;

  const status = request.status;
  if (!status || typeof status !== 'number') {
    const message =
      `Unexpected response status: ${status};` +
      ` body: ${status === 0 ? request.statusText : request.responseText}`;
    reject(new RequestFailedError(message));
  }

  resolve(request);
}

function onAjaxError(error: Error, reject: (e: Error) => void) {
  connectionCounter -= 1;

  reject(error);
}
