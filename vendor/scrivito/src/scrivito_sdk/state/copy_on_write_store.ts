import { ContextContainer } from 'scrivito_sdk/common';

export class CopyOnWriteStore<T> {
  private readonly valueForReading = new ContextContainer<T>();

  constructor(private value: T, private readonly copy: (value: T) => T) {}

  /** run some code that needs to read the value.
   * the passed-in `value` is guaranteed not to change, i.e.
   * any concurrent writes won't become visible.
   */
  read<R>(fn: (value: T) => R): R {
    const currentValue = this.value;
    return this.valueForReading.runWith(currentValue, () => fn(currentValue));
  }

  /** run some code that modifies the value.
   * the modifications will not become visible to concurrent readers.
   */
  write(fn: (value: T) => void) {
    if (this.valueForReading.current() === this.value) {
      // if there's currently someone reading the value,
      // make a copy before writing it
      this.value = this.copy(this.value);
    }

    fn(this.value);
  }
}
