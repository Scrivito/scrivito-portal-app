// rejecting promises with plain objects instead of errors
export class Deferred<ValueType = void> implements PromiseLike<ValueType> {
  promise: Promise<ValueType>;
  resolve!: (value: ValueType) => void;
  reject!: (error: Error) => void;

  private settled?: boolean;

  constructor() {
    this.promise = new Promise(
      (
        resolveFn: (value: ValueType) => void,
        rejectFn: (error: Error) => void
      ) => {
        this.resolve = (value) => {
          this.settled = true;
          resolveFn(value);
        };

        this.reject = (error) => {
          this.settled = true;
          rejectFn(error);
        };
      }
    );
  }

  isPending() {
    return !this.settled;
  }

  then<TResult1 = ValueType, TResult2 = never>(
    onfulfilled?:
      | ((value: ValueType) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }
}
