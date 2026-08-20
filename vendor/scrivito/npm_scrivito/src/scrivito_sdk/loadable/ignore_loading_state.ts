import { capture } from 'scrivito_sdk/loadable';

/** execute the code, but ignore any "not yet loaded" status, pretend everything is loaded.
 *
 * Executes the given function, triggers loading of the accessed data, but:
 * Treat everything as if it were fully loaded, even if it is not.
 *
 * This is useful if you don't want the app to show a loader while the data is loading.
 *
 * Technically, any 'incomplete' data will be treated as 'outdated' instead.
 *
 * This means that:
 * - 'connected' react components will use the data and show no loader
 * - loadAndObserve will emit the data into its event stream
 * - but: load will still wait for the data to be fully loaded before resolving
 *   (since load also waits for 'outdated' data)
 */
export function ignoreLoadingState<T>(fn: () => T): T {
  const captured = capture(fn);

  captured.treatIncompleteAsOutdated().forwardToCurrent();

  return captured.result;
}
