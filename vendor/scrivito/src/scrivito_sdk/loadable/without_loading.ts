import { capture } from 'scrivito_sdk/loadable';

/** Evaluate the loadable function fn, but without causing any loading.
 *
 * You may call with or without a loading context. It does not matter.
 * Even if you call with a loading context, no loading is triggered.
 */
export function withoutLoading<T>(fn: () => T): T {
  return capture(fn).result;
}
