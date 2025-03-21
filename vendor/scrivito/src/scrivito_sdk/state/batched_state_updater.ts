import { collectInListAndSchedule, nextTick } from 'scrivito_sdk/common';
import { withBatchedUpdates } from 'scrivito_sdk/state';

type Callback = () => void;

export const addBatchUpdate = collectInListAndSchedule<Callback>(
  nextTick,
  (callbacks) => {
    withBatchedUpdates(() => callbacks.forEach((callback) => callback()));

    return [];
  }
);
