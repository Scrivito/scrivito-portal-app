export type LazyAsync<T> = T | Promise<T> | (() => T | Promise<T>);

/* apply a function to a LazyAsync value
 *
 * this is similar to what flatMap does for Arrays, or what Promise.then does for Promises.
 */
export function mapLazyAsync<T, S>(
  lazyValue: LazyAsync<T>,
  fn: (eagerValue: T) => LazyAsync<S>
): () => Promise<S> {
  const normalized = normalizeLazyAsync(lazyValue);

  return async () => normalizeLazyAsync(fn(await normalized()))();
}

export function normalizeLazyAsync<T>(value: LazyAsync<T>): () => Promise<T> {
  return async () => (isFunctionLazyAsync(value) ? value() : value);
}

function isFunctionLazyAsync<T>(
  value: LazyAsync<T>
): value is () => T | Promise<T> {
  return typeof value === 'function';
}
