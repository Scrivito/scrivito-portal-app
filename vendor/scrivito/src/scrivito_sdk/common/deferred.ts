import { ScrivitoPromise } from 'scrivito_sdk/common';

// rejecting promises with plain objects instead of errors
export class Deferred<ValueType = void> {
  promise: Promise<ValueType>;
  resolve!: (value: ValueType) => void;
  reject!: (error: Error) => void;

  private settled?: boolean;

  constructor() {
    this.promise = new ScrivitoPromise(
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
}
