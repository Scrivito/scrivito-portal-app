import {
  Deferred,
  InternalError,
  nextTick,
  onReset,
} from 'scrivito_sdk/common';

type Unregister = () => void;

let loadingCount: number = 0;
let deferred: Deferred<void> | undefined;

/** @public */
export function finishLoading(): Promise<void> {
  if (!deferred) {
    deferred = new Deferred();
    nextTick(updateLoadingState);
  }
  return deferred.promise;
}

export function registerLoadingActivity(): Unregister {
  loadingCount += 1;
  return createUnregister();
}

function createUnregister(): Unregister {
  let unregisterHasBeenCalled: boolean = false;
  return function unregister(): void {
    if (unregisterHasBeenCalled) {
      // Unregister must not be called twice
      throw new InternalError();
    }
    loadingCount -= 1;
    unregisterHasBeenCalled = true;
    if (loadingCount === 0) {
      nextTick(updateLoadingState);
    }
  };
}

function updateLoadingState(): void {
  if (deferred && loadingCount === 0) {
    deferred.resolve();
    deferred = undefined;
  }
}

onReset(() => {
  deferred = undefined;
  loadingCount = 0;
});
