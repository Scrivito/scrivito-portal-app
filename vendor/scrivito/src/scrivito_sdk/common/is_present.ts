/** returns true, iff the given value is not null and not undefined.
 * (helps typescript infer the typing when used with higher-order functions)
 */
export function isPresent<T>(
  maybeValue: T | null | undefined
): maybeValue is T {
  return maybeValue !== null && maybeValue !== undefined;
}
