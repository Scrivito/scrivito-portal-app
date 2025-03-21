// this is a "just enough to work" implementation based on the es2015 definition,
// that avoid headscratching https://github.com/Microsoft/TypeScript/issues/11375

interface UnfinishedIteratorResult<T> {
  done?: false;
  value: T;
}

interface FinishedIteratorResult<T> {
  done: true;
  value?: T; // ignored
}

export type IteratorResult<T> =
  | UnfinishedIteratorResult<T>
  | FinishedIteratorResult<T>;

export interface FinishedWithOptionalValueIterator<T> {
  next(): IteratorResult<T>;
}
