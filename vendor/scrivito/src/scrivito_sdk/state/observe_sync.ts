import { equalsBestEffort } from 'scrivito_sdk/common';
import {
  createSyncSubscriber,
  trackStateAccess,
  withFrozenState,
} from 'scrivito_sdk/state';

export interface SyncObservation<T> {
  initialValue: T;
  unsubscribe(): void;
}

/**
 * observe an expression, synchronously.
 *
 * for most cases, the normal, async `observe` is better, faster and more stable.
 * use `observeSync` only if you know what you are doing.
 *
 * Notable differences from async `observe`:
 * * You may not alter state anywhere, not even in the listener.
 * * A slow listener has a much more severe impact on the overall application responsiveness.
 * * The result of the first run is not provided to the listener, but returned as `initialValue`
 *
 */
export function observeSync<T>(
  observedExpression: () => T,
  listener: (value: T) => void
): SyncObservation<T> {
  const firstReport = trackStateAccess(() =>
    withFrozenState(
      {
        contextName: 'observeSync',
        message: 'Use non-sync observe or nextTick',
      },
      observedExpression
    )
  );

  let lastResult = firstReport.result;

  const stateSubscriber = createSyncSubscriber(() => {
    const report = trackStateAccess(observedExpression);

    stateSubscriber.subscribeChanges(report.accessedState);

    const nextResult = report.result;
    if (!equalsBestEffort(nextResult, lastResult)) {
      listener(nextResult);
      lastResult = nextResult;
    }
  });

  stateSubscriber.subscribeChanges(firstReport.accessedState);

  return {
    initialValue: lastResult,

    unsubscribe: () => {
      stateSubscriber.unsubscribe();
    },
  };
}
