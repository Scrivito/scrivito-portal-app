import { Streamable, Subscriber } from 'scrivito_sdk/common';

/** a Subject is a Streamable, into which values can be pushed.
 * It can be used as a way to broadcast values to many subscribers.
 */
export class Subject<T = void> extends Streamable<T> implements Subscriber<T> {
  private subscribers: { [streamId: string]: Subscriber<T> } = {};
  private subscriberIdCounter = 1;
  private isCompleted = false;

  constructor() {
    super((subscriber) => {
      if (this.isCompleted) {
        subscriber.complete();

        return () => undefined;
      }

      const id = (this.subscriberIdCounter++).toString();
      this.subscribers[id] = subscriber;

      this.onNewSubscriber(subscriber);

      return () => {
        delete this.subscribers[id];
      };
    });
  }

  /** push a value to all subscribers */
  next(value: T): void {
    Object.keys(this.subscribers).forEach((id) => {
      this.subscribers[id].next(value);
    });
  }

  complete(): void {
    Object.keys(this.subscribers).forEach((id) =>
      this.subscribers[id].complete()
    );

    this.subscribers = {};
    this.isCompleted = true;
  }

  subscriberCount(): number {
    return Object.keys(this.subscribers).length;
  }

  isClosed() {
    return this.isCompleted;
  }

  protected onNewSubscriber(_subscriber: Subscriber<T>) {
    // intended to be overwritten in subclasses
  }
}

/** a BehaviorSubject keeps track of the current value,
 * and provides it to new Subscribers automatically.
 */
export class BehaviorSubject<T> extends Subject<T> {
  constructor(private value: T) {
    super();
  }

  next(value: T) {
    if (this.value === value) return;

    this.value = value;

    super.next(value);
  }

  protected onNewSubscriber(subscriber: Subscriber<T>) {
    subscriber.next(this.value);
  }
}
