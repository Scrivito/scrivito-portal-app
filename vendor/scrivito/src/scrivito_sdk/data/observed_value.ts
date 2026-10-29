export class ObservedValue<T> {
  private value?: T;

  constructor(
    private readonly onChange?: (oldValue: T | undefined, newValue: T) => void,
  ) {}

  get(): T | undefined {
    return this.value;
  }

  set(newValue: T) {
    const oldValue = this.value;
    this.value = newValue;
    this.onChange?.(oldValue, newValue);
  }
}
