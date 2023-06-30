import { ThrottleSettings, throttle as underscoreThrottle } from 'underscore';

let shouldBypassThrottle: boolean = false;

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
  options?: ThrottleSettings
): T {
  return shouldBypassThrottle ? fn : underscoreThrottle(fn, ms, options);
}

export function bypassThrottle(): void {
  shouldBypassThrottle = true;
}
