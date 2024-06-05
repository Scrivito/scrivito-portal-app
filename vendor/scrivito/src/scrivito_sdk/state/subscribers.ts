import {
  ContextContainer,
  collectAndSchedule,
  nextTick,
} from 'scrivito_sdk/common';
import { StateSubscriber } from 'scrivito_sdk/state';
import { withFrozenState } from 'scrivito_sdk/state/frozen';
import { SubscriberSet } from 'scrivito_sdk/state/subscriber_set';

const syncSubscribers = new SubscriberSet();
const asyncSubscribers = new SubscriberSet();

/** create a new StateSubscriber that will invoke listeners _asynchronously_,
 * when changes happen to subscribed state.
 */
export function createAsyncSubscriber(listener: () => void): StateSubscriber {
  return asyncSubscribers.create(listener);
}

/** create a new StateSubscriber that will invoke listeners _synchronously_,
 * when changes happen to subscribed state.
 * You can pass in a `rank`, which influences the order, in which listeners are notified:
 * listeners with lower rank are notified before listeners with higher rank.
 */
export function createSyncSubscriber(
  listener: () => void,
  rank = 0
): StateSubscriber {
  return syncSubscribers.create(listener, rank);
}

const batchUpdates = new ContextContainer<boolean>();
let notifiedDuringBatchUpdates = false;

export function withBatchedUpdates(fn: () => void) {
  try {
    batchUpdates.runWith(true, fn);
  } finally {
    if (!batchUpdates.current() && notifiedDuringBatchUpdates) {
      notifiedDuringBatchUpdates = false;
      notifySubscribers();
    }
  }
}

let notificationCounter = 0;

// for test purposes
export function createNotificationCounter(): () => number {
  const startedAt = notificationCounter;

  return () => notificationCounter - startedAt;
}

// for test purposes only
export function listenerCount(): number {
  return syncSubscribers.count() + asyncSubscribers.count();
}

export function notifySubscribers() {
  if (batchUpdates.current()) {
    notifiedDuringBatchUpdates = true;

    return;
  }

  notificationCounter++;

  // listeners should not change state, at least not synchronously,
  // since that would create chaos, e.g. race condition between listeners,
  // breaking the one-way-flow of a reactive application, stack overflow etc.
  // you may use nextTick to make a state change asynchronously, though.
  withFrozenState({ contextName: 'state listeners' }, () => {
    notifySyncSubscribers();
    notifyAsyncSubscribers();
  });
}

export function resetSubscribers() {
  syncSubscribers.reset();
  asyncSubscribers.reset();
}

function notifySyncSubscribers() {
  syncSubscribers.forEach((subscriber) => {
    if (subscriber.hasChanges()) subscriber.notify();
  });
}

const notifyAsyncSubscribers = collectAndSchedule(nextTick, () =>
  asyncSubscribers.forEach((subscriber) => {
    if (subscriber.hasChanges()) subscriber.scheduleNotify();
  })
);
