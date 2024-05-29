import { RequestFailedError } from 'scrivito_sdk/client';
import { ExponentialBackoff } from 'scrivito_sdk/client/exponential_backoff';
import { logError } from 'scrivito_sdk/common';

export async function requestWithRateLimitRetry(
  request: () => Promise<Response>
): Promise<Response> {
  if (retriesAreDisabled) return request();

  const backoff = new ExponentialBackoff();

  // note: using a loop instead of recursion avoids stack overflow
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await request();

    if (response.status !== 429) return response;

    // The value for the retry count limit should be high enough to show that the integer overflow
    // protection of the calculated timeout (currently: exponent limited to 16) is working.
    if (limitedRetries && backoff.numberOfRetries() > 19) throw new Error();

    await backoff.nextDelay();
  }
}

export async function retryOnRequestFailed<T>(
  request: () => Promise<T>
): Promise<T> {
  if (retriesAreDisabled) return request();

  const backoff = new ExponentialBackoff();

  // note: using a loop instead of recursion avoids stack overflow
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await request();
    } catch (error) {
      if (!(error instanceof RequestFailedError)) throw error;
      if (limitedRetries && backoff.numberOfRetries() > 5) throw error;

      logError(`"${String(error)}". Retrying the request...`);

      await backoff.nextDelay();
    }
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
