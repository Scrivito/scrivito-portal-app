import { setTimeout } from 'scrivito_sdk/common';
import { type TimeoutType } from 'scrivito_sdk/common/timeout';

let throttleDisabled = false;

export function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  ms: number
): (...args: T) => void {
  if (throttleDisabled) return fn;

  let lastTime = 0;
  let timeoutId: TimeoutType | undefined;
  let lastArgs: T;

  function execute() {
    clearTimeout(timeoutId);
    timeoutId = undefined;
    lastTime = Date.now();
    fn(...lastArgs);
  }

  return function (...args) {
    lastArgs = args;
    const remainingMs = lastTime + ms - Date.now();
    if (remainingMs <= 0) execute();
    else timeoutId ||= setTimeout(execute, remainingMs);
  };
}

// For test purpose only
export function enableThrottle(enabled: boolean): void {
  throttleDisabled = !enabled;
}
