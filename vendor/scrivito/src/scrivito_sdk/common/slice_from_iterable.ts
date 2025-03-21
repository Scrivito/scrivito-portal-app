import { ContinueIterable } from 'scrivito_sdk/common';
import { extractFromIterator } from 'scrivito_sdk/common/iterable';

interface SliceAndContinuation<T, C> {
  values: T[];
  continuation?: C | undefined;
}

/** Extracts a 'slice' of values from an Iterable as an array.
 *
 * Extracts at most `size` values, starting at `continueFrom` (or the beginning).
 * Returns the values and a continuation, which can be used to extract more slices.
 */
export function sliceFromIterable<T, C>(
  iterable: ContinueIterable<T, C>,
  continueFrom: C | undefined,
  size: number
): SliceAndContinuation<T, C> {
  const iterator =
    continueFrom === undefined
      ? iterable.iterator()
      : iterable.iteratorFromContinuation(continueFrom);

  const values = extractFromIterator(iterator, size);

  return { values, continuation: iterator.continuation() };
}
