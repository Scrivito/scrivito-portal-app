function noop() {}
let trackTimeoutId: (id: number) => void = noop;

function setTimeoutAndTrackId(handler: Function, timeout?: number): number {
  // eslint-disable-next-line no-restricted-globals -- This module is allowed to use setTimeout
  const timeoutId = setTimeout(handler, timeout);
  trackTimeoutId(timeoutId);
  return timeoutId;
}

function setIntervalAndTrackId(handler: Function, timeout?: number): number {
  // eslint-disable-next-line no-restricted-globals -- This module is allowed to use setInterval
  const timeoutId = setInterval(handler, timeout);
  trackTimeoutId(timeoutId);
  return timeoutId;
}

export {
  setTimeoutAndTrackId as setTimeout,
  setIntervalAndTrackId as setInterval,
};

/** For test purposes only */
export function setTimeoutIdTracker(callback: (id: number) => void) {
  trackTimeoutId = callback;
}
