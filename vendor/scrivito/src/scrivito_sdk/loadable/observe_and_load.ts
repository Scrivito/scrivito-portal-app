import { Streamable, runAndCatchException } from 'scrivito_sdk/common';
import {
  LoadableState,
  LoadingSubscriber,
  capture,
} from 'scrivito_sdk/loadable';
import { observe } from 'scrivito_sdk/state';

export type StateStream<T> = Streamable<LoadableState<T>>;

export function observeAndLoad<T>(loadableExpression: () => T): StateStream<T> {
  return new Streamable((observer) => {
    const loadingSubscriber = new LoadingSubscriber();

    const subscription = observe(() =>
      capture(() => runAndCatchException(loadableExpression))
    ).subscribe((captured) => {
      captured.subscribeLoading(loadingSubscriber);

      const outcome = captured.result;

      observer.next(
        outcome.errorThrown
          ? {
              meta: {
                error: outcome.error,
                incomplete: captured.incomplete,
                outdated: captured.outdated,
              },
            }
          : {
              value: outcome.result,
              meta: {
                incomplete: captured.incomplete,
                outdated: captured.outdated,
              },
            }
      );
    });

    return () => {
      subscription.unsubscribe();
      loadingSubscriber.unsubscribe();
    };
  });
}
