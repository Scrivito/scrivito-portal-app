import {
  capture,
  isCurrentlyCapturing,
  loadWithDefault,
} from 'scrivito_sdk/loadable';

/** Evaluate the loadableFunction and return its result, if fully loaded.
 * Otherwise, return the default.
 *
 * You may use this without a loading context, but it will _not_ trigger loading!
 * If you want to be sure, that loading is triggered, prefer `loadWithDefault`.
 */
export function loadableWithDefault<T, S>(
  theDefault: T,
  loadableFunction: () => S
): T | S {
  const captured = capture(() => loadWithDefault(theDefault, loadableFunction));

  if (isCurrentlyCapturing()) {
    captured.forwardToCurrent();
  }

  return captured.result;
}
