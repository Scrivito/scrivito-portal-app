import { ContinueIterable, sliceFromIterable } from 'scrivito_sdk/common';
import { loadSerial } from 'scrivito_sdk/loadable/load_serial';
import { loadableFunction } from 'scrivito_sdk/loadable/loadable_function';

/** generate a function that applies the given mapper and reducer over the given input.
 *
 * the map-reduce is performed in small batches, in order to avoid blocking
 * the event loop with long-running events.
 *
 * The batches are loaded serially (one after the other), in order to avoid flooding
 * the event loop with too many small events at once.
 * */
export function loadableMapReduce<InputElement, Continuation, ReductionType>(
  input: ContinueIterable<InputElement, Continuation>,
  mapper: (value: InputElement) => ReductionType,
  reducer: (acc: ReductionType, value: ReductionType) => ReductionType,
  empty: ReductionType,
  batchSize = 20
): () => ReductionType {
  /** perform the reduction from the given batch to the last one */
  function computeReductionFrom(batchNumber: number): ReductionType {
    return loadSerial(
      () => getReducedBatch(batchNumber),
      ({ value, continuation }) =>
        !continuation
          ? value
          : reducer(value, computeReductionFrom(batchNumber + 1))
    );
  }

  interface ReducedBatch {
    value: ReductionType;
    continuation?: Continuation | undefined;
  }

  type GetReducedBatch = (batchNumber: number) => ReducedBatch;

  /** compute the map-reduce for the given batch */
  const getReducedBatch: GetReducedBatch = loadableFunction(
    { value: empty },
    (batchNumber) => batchNumber.toString(),
    (batchNumber: number): ReducedBatch => {
      const continueFrom =
        batchNumber === 0
          ? undefined
          : getReducedBatch(batchNumber - 1).continuation;

      const slice = sliceFromIterable(input, continueFrom, batchSize);

      return {
        value: slice.values.map(mapper).reduce(reducer, empty),
        continuation: slice.continuation,
      };
    }
  );

  return () => computeReductionFrom(0);
}
