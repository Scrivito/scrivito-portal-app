import { Deferred, InternalError } from 'scrivito_sdk/common';

export class ConfigStore<T> {
  private configDeferred = new Deferred<T>();
  private storedConfig: T | undefined;

  set(config: T): void {
    if (!this.configDeferred.isPending()) throw new InternalError();

    this.configDeferred.resolve(config);
    this.storedConfig = config;
  }

  get(): T {
    if (this.storedConfig === undefined) throw new InternalError();

    return this.storedConfig;
  }

  fetch(): PromiseLike<T> {
    return this.configDeferred;
  }

  hasBeenSet(): boolean {
    return !this.configDeferred.isPending();
  }

  // For test purpose only.
  reset(): void {
    this.configDeferred = new Deferred();
    this.storedConfig = undefined;
  }
}
