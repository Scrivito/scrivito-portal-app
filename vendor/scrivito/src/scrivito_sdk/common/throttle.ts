import { type ThrottleSettings } from 'lodash-es/throttle';
import doThrottle from 'lodash-es/throttle';

let shouldBypassThrottle: boolean = false;

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
  options?: ThrottleSettings
): T {
  return shouldBypassThrottle
    ? fn
    : (doThrottle(fn, ms, options) as unknown as T);
}

export function bypassThrottle(): void {
  shouldBypassThrottle = true;
}
