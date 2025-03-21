import { capture } from 'scrivito_sdk/loadable';

/** run the given functions, loading them serially.
 *
 * both functions are always run, but loading of the second function only starts
 * after loading of the first function has finished.
 */
export function loadSerial<S, T>(
  firstFn: () => S,
  secondFn: (input: S) => T
): T {
  const firstCaptured = capture(firstFn);
  firstCaptured.forwardToCurrent();

  const secondCaptured = capture(() => secondFn(firstCaptured.result));
  if (firstCaptured.isAllDataLoaded()) secondCaptured.forwardToCurrent();

  return secondCaptured.result;
}
