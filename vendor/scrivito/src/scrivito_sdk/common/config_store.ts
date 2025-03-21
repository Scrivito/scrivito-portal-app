import { Deferred, InternalError } from 'scrivito_sdk/common';

export class ConfigStore<T> {
  private configDeferred = new Deferred<T>();
  private storedConfig: { config: T } | undefined;

  set(config: T): void {
    if (this.storedConfig !== undefined) throw new InternalError();

    this.configDeferred.resolve(config);
    this.storedConfig = { config };
  }

  get(): T {
    if (this.storedConfig === undefined) throw new InternalError();

    return this.storedConfig.config;
  }

  fetch(): PromiseLike<T> {
    return this.configDeferred;
  }

  hasBeenSet(): boolean {
    return this.storedConfig !== undefined;
  }

  // For test purpose only.
  reset(): void {
    this.configDeferred = new Deferred();
    this.storedConfig = undefined;
  }
}
