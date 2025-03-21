import doThrottle, { ThrottleSettings } from 'lodash-es/throttle';

let throttleDisabled = false;

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
  options?: ThrottleSettings
): T {
  return throttleDisabled ? fn : (doThrottle(fn, ms, options) as unknown as T);
}

// For test purpose only
export function disableThrottle(): void {
  throttleDisabled = true;
}
