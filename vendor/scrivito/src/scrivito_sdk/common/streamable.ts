import { ScrivitoError } from 'scrivito_sdk/common';

type UnsubscribeFunction = () => void;

/** a SubscribeFunction receives a subscriber, which will receive values from the stream.
 * It returns an UnsubscribeFunction, to cancel the subscription.
 */
type SubscribeFunction<T> = (
  subscriber: Subscriber<T>
) => Subscription | UnsubscribeFunction;

export interface Subscriber<T> {
  next(value: T): void;
  complete(): void;

  isClosed(): boolean;
}

/** a Subscription represents an open ('subscribed') stream.
 * Close the stream by unsubscribing.
 */
export interface Subscription {
  unsubscribe(): void;
  isClosed(): boolean;
}

/** A Streamable represents a resource that can be streamed.
 *
 * The resource is streamed, by subscribing the Streamable.
 * The result is a Subscription, which can be used to unsubscribe,
 * thereby closing the stream.
 *
 * Note: It is a very light-weight subset of the Observable pattern,
 * known from RxJs et. al.
 */
export class Streamable<T> {
  /** create a Streamable from the given subscribeFunction */
  constructor(private readonly subscribeFunction: SubscribeFunction<T>) {}

  /** subscribe this Streamable, streaming values into the provided function. */
  subscribe(
    nextOrSubscriber: Partial<Subscriber<T>> | ((value: T) => void)
  ): Subscription {
    const intermediary = new Intermediary(
      typeof nextOrSubscriber === 'object'
        ? nextOrSubscriber
        : { next: nextOrSubscriber }
    );

    const subscriptionOrUnsubscribe = this.subscribeFunction(intermediary);

    intermediary.setUnsubscribeCallback(
      typeof subscriptionOrUnsubscribe === 'object'
        ? () => subscriptionOrUnsubscribe.unsubscribe()
        : subscriptionOrUnsubscribe
    );

    return intermediary;
  }

  map<S>(fn: (value: T) => S): Streamable<S> {
    return new Streamable((subscriber) =>
      this.subscribe({
        next: (value: T) => subscriber.next(fn(value)),
        complete: () => subscriber.complete(),
      })
    );
  }

  filter<S extends T>(test: (value: T) => value is S): Streamable<S>;
  filter(test: (value: T) => boolean): Streamable<T>;
  filter<S extends T>(test: (value: T) => value is S): Streamable<S> {
    return new Streamable((subscriber) =>
      this.subscribe({
        next: (value: T) => {
          if (test(value)) {
            subscriber.next(value);
          }
        },
        complete: () => subscriber.complete(),
      })
    );
  }

  /** Returns a Promise that resolves with the final (=last) value of the stream,
   * when the stream completes.
   * If the stream is empty (i.e. it completes before emitting a value),
   * the Promise resolves with undefined.
   */
  toPromise(): Promise<T | undefined> {
    return new Promise((resolve) => {
      let lastValue: T | undefined;

      this.subscribe({
        next(value) {
          lastValue = value;
        },
        complete() {
          resolve(lastValue);
        },
      });
    });
  }

  /** Returns a new Streamable, truncated to the first value. */
  takeOne(): Streamable<T> {
    return new Streamable((subscriber) => {
      let subscription: null | Subscription = null;

      subscription = this.subscribe({
        next: (value) => {
          if (subscription) subscription.unsubscribe();
          subscriber.next(value);
          subscriber.complete();
        },
        complete: () => {
          subscriber.complete();
        },
      });

      if (subscriber.isClosed()) subscription.unsubscribe();

      return subscription;
    });
  }

  /** Returns a Promise to the first value that the stream emits.
   * The Promise rejects, if the stream completes before any value is emitted.
   */
  waitForFirst(): Promise<T> {
    return new Promise((resolve, reject) => {
      let resolved = false;
      this.takeOne().subscribe({
        next(value) {
          resolved = true;
          resolve(value);
        },
        complete() {
          if (!resolved) reject(new EndOfStreamError());
        },
      });
    });
  }

  /** Transforms this stream, so that it completes, when the passed-in stream
   * emits its first value or completes.
   */
  takeUntil(until: Streamable<unknown>): Streamable<T> {
    return new Streamable<T>((subscriber) => {
      let untilSubscription: Subscription | undefined;
      let subscription: Subscription | undefined;

      // eslint-disable-next-line prefer-const
      subscription = this.subscribe({
        next(value) {
          subscriber.next(value);
        },
        complete() {
          completeStream();
        },
      });

      // edge-case: stream that completes immediately
      if (subscription.isClosed()) return () => undefined;

      // eslint-disable-next-line prefer-const
      untilSubscription = until.subscribe({
        next() {
          completeStream();
        },
        complete() {
          completeStream();
        },
      });

      function completeStream() {
        subscriber.complete();
        cleanup();
      }

      function cleanup() {
        if (subscription) subscription.unsubscribe();
        if (untilSubscription) untilSubscription.unsubscribe();
      }

      return cleanup;
    });
  }
}

export class EndOfStreamError extends ScrivitoError {}

/** An Intermediary is a proxy between a Streamable and a Subscriber.
 *
 * The Streamable receives the Intermediary as the Subscriber.
 * The Subscriber receives the Intermediary as the Subscription.
 *
 * The purpose of the Intermediary is to normalize the API.
 * It ensures that unsubscribe and complete are always idempotent, for example.
 */
class Intermediary<T> implements Subscriber<T>, Subscription {
  private subscriber?: Partial<Subscriber<T>>;
  private unsubscribeCallback?: UnsubscribeFunction;

  constructor(subscriber: Partial<Subscriber<T>>) {
    this.subscriber = subscriber;
  }

  next(value: T) {
    if (this.subscriber && this.subscriber.next) {
      this.subscriber.next(value);
    }
  }

  complete() {
    if (this.subscriber && this.subscriber.complete) {
      this.subscriber.complete();
    }

    this.subscriber = undefined;
  }

  unsubscribe() {
    if (!this.subscriber) return;
    this.subscriber = undefined;

    if (this.unsubscribeCallback) {
      this.unsubscribeCallback.apply(undefined);
    }
  }

  isClosed() {
    return !this.subscriber;
  }

  setUnsubscribeCallback(callback: UnsubscribeFunction) {
    this.unsubscribeCallback = callback;
  }
}
