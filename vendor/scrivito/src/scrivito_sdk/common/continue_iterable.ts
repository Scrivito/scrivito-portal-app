import { Iterator, IteratorResult, TransIterator } from 'scrivito_sdk/common';

export interface Iterable<T> {
  iterator(): Iterator<T>;
}

export interface ContinueIterable<T, C> extends Iterable<T> {
  iterator(): ContinueIterator<T, C>;
  iteratorFromContinuation(continuation: C): ContinueIterator<T, C>;
}

export interface ContinueIterator<T, C> extends Iterator<T> {
  next(): IteratorResult<T>;
  continuation(): C | undefined;
}

/** create a new ContinueIterable by applying a transformation on a given one
 *
 * The transformation is given as a function.
 * The function maps from source iterator to target iterator.
 * This mapping defines the new ContinueIterable.
 *
 * For convenience, the source iterator is wrapped in a TransIterator.
 */
export function transformContinueIterable<From, To, C>(
  iterable: ContinueIterable<From, C>,
  transform: (iter: TransIterator<From>) => Iterator<To>
): ContinueIterable<To, C> {
  return new TransformedContinueIterable(iterable, transform);
}

export class EmptyContinueIterable<T, C> implements ContinueIterable<T, C> {
  iterator() {
    return new EmptyContinueIterator<T, C>();
  }

  iteratorFromContinuation(_continuation: C) {
    return new EmptyContinueIterator<T, C>();
  }
}

class EmptyContinueIterator<T, C> implements ContinueIterator<T, C> {
  next(): IteratorResult<T> {
    return { done: true };
  }

  continuation() {
    return undefined;
  }
}

class TransformedContinueIterable<From, To, C>
  implements ContinueIterable<To, C>
{
  constructor(
    private readonly iterable: ContinueIterable<From, C>,
    private readonly transform: (iter: TransIterator<From>) => Iterator<To>
  ) {}

  iterator() {
    return new TransformedContinueIterator(
      this.iterable.iterator(),
      this.transform
    );
  }

  iteratorFromContinuation(continuation: C) {
    return new TransformedContinueIterator(
      this.iterable.iteratorFromContinuation(continuation),
      this.transform
    );
  }
}

class TransformedContinueIterator<From, To, C>
  implements ContinueIterator<To, C>
{
  private readonly transformedIterator: Iterator<To>;

  constructor(
    private readonly iterator: ContinueIterator<From, C>,
    transform: (iter: TransIterator<From>) => Iterator<To>
  ) {
    this.transformedIterator = transform(new TransIterator(iterator));
  }

  next() {
    return this.transformedIterator.next();
  }

  continuation() {
    return this.iterator.continuation();
  }
}
