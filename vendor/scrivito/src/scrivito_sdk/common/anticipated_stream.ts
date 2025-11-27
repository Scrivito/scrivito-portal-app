import { Streamable, Subscription } from 'scrivito_sdk/common';

/** Convert a Promise to a Stream into the promised Stream. */
export function anticipatedStream<T>(
  streamPromise: Promise<Streamable<T>>
): Streamable<T> {
  return new Streamable((subscriber) => {
    let subscription: Subscription | undefined;

    (async () => {
      try {
        const stream = await streamPromise;
        if (subscriber.isClosed()) return;

        subscription = stream.subscribe(subscriber);
      } catch (error) {
        subscriber.complete();

        throw error;
      }
    })();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  });
}
