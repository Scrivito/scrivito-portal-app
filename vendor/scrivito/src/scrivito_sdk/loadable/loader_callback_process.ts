import { InternalError } from 'scrivito_sdk/common';

import {
  LoadableMeta,
  LoadableState,
  LoadableVersion,
} from 'scrivito_sdk/loadable/loadable_state';
import { LoaderProcess } from 'scrivito_sdk/loadable/loading_registry';
import { StateContainer, addBatchUpdate } from 'scrivito_sdk/state';

export type LoaderCallback<T> = () => Promise<T>;

export type InvalidationCallback = () => LoadableVersion;

type LoadId = number;

let loadIdCounter = 0;

export class LoaderCallbackProcess<LoadableType> implements LoaderProcess {
  private currentLoad: LoadId | undefined;

  constructor(
    private readonly stateContainer: StateContainer<
      LoadableState<LoadableType>
    >,
    private readonly loader: LoaderCallback<LoadableType>,
    private readonly invalidation?: InvalidationCallback
  ) {}

  notifyDataRequired() {
    this.triggerLoadingIfNeeded();
  }

  notifyDataNoLongerRequired() {
    // don't care
  }

  notifyDataWasSet() {
    // when data was set, discard any loading that may still be ongoing
    this.currentLoad = undefined;
  }

  setTidyCallback() {
    // this process currently never tidies itself up.
    // data loaded via this process is intended to be "cached forever" anyway.
  }

  // trigger loading the data.
  // does nothing if the data is already loading, or no loading is needed.
  private triggerLoadingIfNeeded() {
    if (this.isLoading()) return;

    const versionWhenLoadingStarted = versionFromCallback(this.invalidation);
    if (!this.loadingNeeded(versionWhenLoadingStarted)) return;

    const loadId = loadIdCounter++;

    const finishLoader = (effect: () => void) => {
      if (this.currentLoad === loadId) {
        addBatchUpdate(() => {
          effect();
          this.currentLoad = undefined;
        });
      }
    };

    this.loader().then(
      (result) =>
        finishLoader(() =>
          this.stateContainer.set({
            value: result,
            meta: { version: versionWhenLoadingStarted },
          })
        ),
      (error) =>
        finishLoader(() =>
          this.stateContainer.set({
            meta: { error, version: versionWhenLoadingStarted },
          })
        )
    );

    this.currentLoad = loadId;
  }

  private loadingNeeded(currentVersion?: LoadableVersion): boolean {
    const metaStateContainer = this.stateContainer.subState('meta');
    const meta = metaStateContainer.get();

    // not yet loaded?
    if (meta === undefined) return true;

    // no invalidation used (and therefore up-to-date by definition)?
    if (currentVersion === undefined) return false;

    // not up-to-date?
    return currentVersion !== meta.version;
  }

  private isLoading() {
    return this.currentLoad !== undefined;
  }
}

export function metaHasBeenInvalidated(
  meta: LoadableMeta | undefined,
  callback?: InvalidationCallback
) {
  if (!callback || meta === undefined) return false;

  return versionFromCallback(callback) !== meta.version;
}

export function versionFromCallback(callback?: InvalidationCallback) {
  if (!callback) {
    return;
  }

  const version = callback();

  // protect against "crazy" objects like NaN
  if (typeof version === 'number' && isNaN(version)) {
    // invalidation callback returned unsuitable version
    throw new InternalError();
  }

  return version;
}
