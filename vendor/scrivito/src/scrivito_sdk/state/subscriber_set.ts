import { collectAndSchedule, nextTick } from 'scrivito_sdk/common';
import { StateReference } from 'scrivito_sdk/state';
import { CopyOnWriteStore } from 'scrivito_sdk/state/copy_on_write_store';

/** A StateSubscriber can be used to subscribe to changes of state. */
export interface StateSubscriber {
  /** subscribe to changes to the state referenced via StateReference.
   * this replaces any earlier subscribeChanges calls,
   * i.e. prior subscribed state is automatically unsubscribed.
   */
  subscribeChanges(stateReference: StateReference): void;

  /** unsubscribe from changes subscribed previously */
  unsubscribe(): void;

  /** A StateSubscriber is awake by default.
   * Call with false to pause the subscription, call with true to resume.
   */
  setAwake(awake: boolean): void;
}

type SubscriberStore = Subscriber[];

export class SubscriberSet {
  private readonly subscribersStore = new CopyOnWriteStore<SubscriberStore>(
    [],
    (subscribers) => subscribers.slice()
  );

  /** This method is exposed to other packages as
   * `createSyncSubscriber` and `createAsyncSubscriber`.
   */
  create(listener: () => void, rank: number = 0): StateSubscriber {
    return new Subscriber(this, listener, rank);
  }

  count() {
    return this.subscribersStore.read((subscribers) => subscribers.length);
  }

  reset() {
    this.subscribersStore.write((subscribers) => {
      subscribers.length = 0;
    });
  }

  forEach(fn: (subscriber: Subscriber) => void): void {
    this.subscribersStore.read((subscribers) => subscribers.forEach(fn));
  }

  add(subscriber: Subscriber): void {
    this.subscribersStore.write((subscribers) => {
      const index = subscribers.findIndex((s) => s.rank > subscriber.rank);
      const spliceIndex = index === -1 ? subscribers.length : index;
      subscribers.splice(spliceIndex, 0, subscriber);
    });
  }

  remove(subscriber: Subscriber): void {
    this.subscribersStore.write((subscribers) => {
      const index = subscribers.indexOf(subscriber);
      if (index >= 0) {
        subscribers.splice(index, 1);
      }
    });
  }
}

/** Subscriber is the internal implementation of the StateSubscriber interface. */
class Subscriber implements StateSubscriber {
  private activeReference?: StateReference;
  private awake = true;
  private notificationDuringSleep = false;

  constructor(
    private readonly subscriberSet: SubscriberSet,
    private readonly listener: () => void,
    readonly rank = 0
  ) {}

  /** This method is exposed to other packages as
   * part of the StateSubscriber interface.
   */
  subscribeChanges(stateReference: StateReference): void {
    if (!this.activeReference) this.subscriberSet.add(this);

    this.activeReference = stateReference;

    if (this.hasChanges()) this.listener();
  }

  /** This method is exposed to other packages as
   * part of the StateSubscriber interface.
   */
  unsubscribe(): void {
    if (!this.activeReference) return;

    this.subscriberSet.remove(this);

    this.activeReference = undefined;
  }

  /** This method is exposed to other packages as
   * part of the StateSubscriber interface.
   */
  setAwake(awake: boolean) {
    this.awake = awake;

    if (awake && this.notificationDuringSleep) {
      this.notify();
      this.notificationDuringSleep = false;
    }
  }

  scheduleNotify = collectAndSchedule(nextTick, () => this.notify());

  notify(): void {
    if (!this.activeReference) return;

    if (!this.awake) {
      this.notificationDuringSleep = true;
      return;
    }

    this.listener();
  }

  hasChanges(): boolean {
    return !!this.activeReference?.hasChanges();
  }
}
