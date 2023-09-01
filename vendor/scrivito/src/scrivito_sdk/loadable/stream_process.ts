import once from 'lodash-es/once';

import {
  Subject,
  Subscription,
  collectAndSchedule,
  nextTick,
  waitMs,
} from 'scrivito_sdk/common';
import { LoadableState } from 'scrivito_sdk/loadable';
import { LoaderProcess } from 'scrivito_sdk/loadable/loading_registry';
import { StateStream } from 'scrivito_sdk/loadable/observe_and_load';
import { StateContainer, addBatchUpdate } from 'scrivito_sdk/state';

export class StreamProcess<LoadableType> implements LoaderProcess {
  private subscription?: Subscription;
  private notifyRequiredCounter = 0;
  private tidyCallback?: () => void;

  constructor(
    private readonly stateContainer: StateContainer<
      LoadableState<LoadableType>
    >,
    private readonly stream: StateStream<LoadableType>
  ) {}

  notifyDataRequired() {
    this.notifyRequiredCounter++;
    this.enqueueStreamRequired(true);
  }

  notifyDataNoLongerRequired() {
    const counterBefore = this.notifyRequiredCounter;
    enqueueFlush(() => {
      if (counterBefore !== this.notifyRequiredCounter) return;

      this.enqueueStreamRequired(false);
    });
  }

  notifyDataWasSet() {
    // don't care
  }

  setTidyCallback(tidyCallback: () => void): void {
    this.tidyCallback = tidyCallback;
  }

  private scheduleNextState = collectAndSchedule(
    addBatchUpdate,
    (state: LoadableState<LoadableType>) => {
      if (!this.isStreamOpen()) return;

      this.stateContainer.set(state);
    }
  );

  private enqueueStreamRequired = collectAndSchedule(
    nextTick,
    (streamRequired: boolean) =>
      streamRequired ? this.ensureStreamIsOpen() : this.ensureStreamIsClosed()
  );

  private isStreamOpen() {
    return !!this.subscription;
  }

  private ensureStreamIsOpen() {
    if (!this.subscription) {
      this.subscription = this.stream.subscribe((state) =>
        this.scheduleNextState(state)
      );
    }
  }

  private ensureStreamIsClosed() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;

      if (this.tidyCallback) this.tidyCallback();
    }

    this.stateContainer.set(undefined);
  }
}

// exported for test purposes only
export const UNSUBSCRIBE_DELAY = 10000;

const flushSubject = new Subject();

/** Unsubscribe all streams that are no longer needed, without delay.
 * (for test purposes only)
 */
export function flushLoadableStreams() {
  flushSubject.next();
}

function enqueueFlush(callback: () => void) {
  const runCallbackOnce = once(callback);

  waitMs(UNSUBSCRIBE_DELAY).then(runCallbackOnce);
  flushSubject.waitForFirst().then(runCallbackOnce);
}
