export class ContextContainer<ContextType> {
  private currentContext: ContextType | undefined;

  current(): ContextType | undefined {
    return this.currentContext;
  }

  runWith<T>(valueForFunction: ContextType, fn: () => T): T {
    const before = this.currentContext;

    try {
      this.currentContext = valueForFunction;

      return fn();
    } finally {
      this.currentContext = before;
    }
  }
}
