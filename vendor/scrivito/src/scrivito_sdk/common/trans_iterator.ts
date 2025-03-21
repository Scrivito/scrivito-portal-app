import { Iterator, IteratorResult } from 'scrivito_sdk/common';

/** a TransIterator wraps an iterator, adding transformation capabilities */
export class TransIterator<T> implements Iterator<T> {
  readonly next: () => IteratorResult<T>;

  constructor(nextOrIterator: Iterator<T> | (() => IteratorResult<T>)) {
    this.next =
      typeof nextOrIterator === 'object'
        ? nextOrIterator.next.bind(nextOrIterator)
        : nextOrIterator;
  }

  map<S>(fn: (item: T) => S): TransIterator<S> {
    return new TransIterator<S>(() => {
      const nextResult = this.next();
      if (nextResult.done) return { done: true };

      return { value: fn(nextResult.value) };
    });
  }

  filter<S extends T>(test: (item: T) => item is S): TransIterator<S>;
  filter(test: (item: T) => boolean): TransIterator<T>;
  filter<S extends T>(test: (item: T) => item is S): TransIterator<S> {
    const next = (): IteratorResult<S> => {
      const nextResult = this.next();
      if (nextResult.done) return { done: true };

      const value = nextResult.value;
      return test(value) ? { value } : next();
    };

    return new TransIterator(next);
  }

  takeWhile<S extends T>(test: (item: T) => item is S): TransIterator<S>;
  takeWhile(test: (item: T) => boolean): TransIterator<T>;
  takeWhile<S extends T>(test: (item: T) => item is S): TransIterator<S> {
    let stopped = false;

    return new TransIterator<S>(() => {
      if (stopped) return { done: true };

      const nextResult = this.next();
      if (nextResult.done) return { done: true };

      const value = nextResult.value;
      if (test(value)) return { value };

      stopped = true;
      return { done: true };
    });
  }
}
