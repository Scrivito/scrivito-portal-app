import { ContinueIterable, sliceFromIterable } from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';

export async function loadEntireIterable<T, C>(
  iterable: ContinueIterable<T, C>
): Promise<T[]> {
  const result: T[] = [];
  let continuation: C | undefined;

  do {
    const batch = await load(() =>
      sliceFromIterable(iterable, continuation, 1)
    );

    continuation = batch.continuation;
    batch.values.forEach((value) => result.push(value));
  } while (continuation);

  return result;
}
