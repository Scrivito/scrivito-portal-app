import { runAndCatchErrorsWhileLoading } from 'scrivito_sdk/loadable';

/** Evaluate the loadableFunction and return its result, if fully loaded.
 * Otherwise, return the default.
 *
 * Must be called with a loading context.
 * Loading of `loadableFunction` is triggered.
 */
export function loadWithDefault<T, S>(
  theDefault: T,
  loadableFunction: () => S
): T | S {
  const run = runAndCatchErrorsWhileLoading(loadableFunction);

  return run.allDataLoaded ? run.result : theDefault;
}
