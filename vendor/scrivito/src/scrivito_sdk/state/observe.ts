import { Streamable, equalsBestEffort, nextTick } from 'scrivito_sdk/common';
import {
  createAsyncSubscriber,
  trackStateAccess,
  withFrozenState,
} from 'scrivito_sdk/state';

/**
 * observe an expression, which calculates a value based on state.
 *
 * `observedExpression` will be executed once initially
 * and re-executed whenever the global state changes in a relevant way.
 *
 * `observedExpression` is expected to be a pure function,
 * i.e. it should be deterministic and not have side-effects.
 *
 * whenever `observedExpression` is executed,
 * the returned value is emitted into the returned Streamable.
 */
export function observe<T>(observedExpression: () => T): Streamable<T> {
  return new Streamable((observer) => {
    let active = true;

    let lastResult: T;
    let lastResultInitialized = false;

    const stateSubscriber = createAsyncSubscriber(run);

    function run() {
      if (!active) {
        return;
      }

      const report = trackStateAccess(() =>
        withFrozenState(
          {
            contextName: 'observe',
            message: 'Extract all side-effects into the listener function',
          },
          observedExpression
        )
      );

      stateSubscriber.subscribeChanges(report.accessedState);

      const nextResult = report.result;
      if (lastResultInitialized && equalsBestEffort(nextResult, lastResult)) {
        return;
      }

      observer.next(nextResult);

      lastResult = nextResult;
      lastResultInitialized = true;
    }

    nextTick(run);

    return () => {
      active = false;
      stateSubscriber.unsubscribe();
    };
  });
}
