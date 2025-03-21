import { waitMs } from 'scrivito_sdk/common';

export class ExponentialBackoff {
  private retryCount = 0;

  // for test purposes only
  numberOfRetries(): number {
    return this.retryCount;
  }

  /** waits for an exponentially increasing amount of time */
  nextDelay(): Promise<void> {
    const timeToWait = Math.pow(2, Math.min(this.retryCount, 16)) * 500;
    this.retryCount++;

    return waitMs(timeToWait);
  }
}
