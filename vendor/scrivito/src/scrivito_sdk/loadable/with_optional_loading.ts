import { capture, isCurrentlyCapturing } from 'scrivito_sdk/loadable';

/** Evaluate the loadable function fn, without requiring a loading context.
 * If called with a loading context, loading will be triggered. Otherwise not.
 */
export function withOptionalLoading<T>(fn: () => T): T {
  const captured = capture(fn);

  if (isCurrentlyCapturing()) {
    captured.forwardToCurrent();
  }

  return captured.result;
}
