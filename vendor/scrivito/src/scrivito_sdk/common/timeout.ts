function noop() {}
let trackTimeoutId: (id: TimeoutType) => void = noop;

export type TimeoutType = ReturnType<typeof setTimeout>;

function setTimeoutAndTrackId(
  handler: () => void,
  timeout?: number
): TimeoutType {
  // eslint-disable-next-line no-restricted-globals -- This module is allowed to use setTimeout
  const timeoutId = setTimeout(handler, timeout);
  trackTimeoutId(timeoutId);
  return timeoutId;
}

function setIntervalAndTrackId(
  handler: () => void,
  timeout?: number
): TimeoutType {
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
export function setTimeoutIdTracker(callback: (id: TimeoutType) => void) {
  trackTimeoutId = callback;
}
