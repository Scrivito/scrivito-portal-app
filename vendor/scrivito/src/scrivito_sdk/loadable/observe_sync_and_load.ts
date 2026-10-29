// @rewire

import { equalsBestEffort } from 'scrivito_sdk/common';
import { LoadingSubscriber, capture } from 'scrivito_sdk/loadable';
import { observeSync, trackStateAccess } from 'scrivito_sdk/state';

interface SyncAndLoadObservation {
  unsubscribe(): void;
}

export function observeSyncAndLoad<T>(
  observedExpression: () => T,
  listener: (value: T) => void,
): SyncAndLoadObservation {
  const loadingSubscriber = new LoadingSubscriber();

  let lastResult = trackStateAccess(observedExpression).result;

  const subscription = observeSync(
    () => capture(observedExpression),
    (captured) => {
      captured.subscribeLoading(loadingSubscriber);

      const nextResult = captured.result;

      if (
        lastResult === undefined ||
        !equalsBestEffort(nextResult, lastResult)
      ) {
        listener(nextResult);
        lastResult = nextResult;
      }
    },
  );

  return {
    unsubscribe: () => {
      subscription.unsubscribe();
      loadingSubscriber.unsubscribe();
    },
  };
}
