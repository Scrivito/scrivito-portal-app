import { RequestFailedError } from 'scrivito_sdk/client';
import { RawResponse } from 'scrivito_sdk/client/raw_response';
import { waitMs } from 'scrivito_sdk/common';

export async function requestWithRateLimitRetry(
  request: () => Promise<RawResponse>,
  retryCount: number = 0
): Promise<RawResponse> {
  if (retriesAreDisabled) return request();

  const response = await request();

  if (response.httpStatus === 429) {
    // The value for the retry count limit should be high enough to show that the integer overflow
    // protection of the calculated timeout (currently: exponent limited to 16) is working.
    if (limitedRetries && retryCount > 19) throw new Error();

    const retryAfterHeader = Number(response.retryAfterHeader) || 0;

    await waitMs(Math.max(retryAfterHeader * 1000, calculateDelay(retryCount)));

    return requestWithRateLimitRetry(request, retryCount + 1);
  }

  return response;
}

export async function retryOnRequestFailed<T>(
  request: () => Promise<T>,
  retryCount: number = 0
): Promise<T> {
  if (retriesAreDisabled) return request();

  try {
    return await request();
  } catch (error) {
    if (!(error instanceof RequestFailedError)) throw error;
    if (limitedRetries && retryCount > 5) throw error;

    await waitMs(calculateDelay(retryCount));
    return retryOnRequestFailed(request, retryCount + 1);
  }
}

let limitedRetries: true | undefined;
let retriesAreDisabled: true | undefined;

// For test purpose only.
export function disableRetries() {
  retriesAreDisabled = true;
}

// For test purpose only.
export function limitRetries() {
  retriesAreDisabled = undefined;
  limitedRetries = true;
}

function calculateDelay(retryCount: number): number {
  return Math.pow(2, Math.min(retryCount, 16)) * 500;
}
