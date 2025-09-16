import { Streamable } from 'scrivito_sdk/common';
import { LoadableData } from 'scrivito_sdk/loadable';
import { LoadableState } from 'scrivito_sdk/loadable/loadable_state';
import {
  InvalidationCallback,
  LoaderCallback,
  LoaderCallbackProcess,
} from 'scrivito_sdk/loadable/loader_callback_process';
import { applyOfflineHandling } from 'scrivito_sdk/loadable/offline_handling';
import { StoreEntry } from 'scrivito_sdk/loadable/offline_store';
import { StreamProcess } from 'scrivito_sdk/loadable/stream_process';
import { StateContainer } from 'scrivito_sdk/state';

export type LoaderProcessParams<T> =
  | ParamsWithLoader<T>
  | ParamsWithStream<T>
  | ParamsWithLoadableStream<T>;

export interface ParamsWithLoader<T> {
  loader: LoaderCallback<T>;
  offlineLoader?: LoaderCallback<T>;
  offlineEntry?: StoreEntry<T>;
  invalidation?: InvalidationCallback;

  loadableStream?: undefined;
  stream?: undefined;
}

interface ParamsWithStream<T> {
  stream: Streamable<T>;

  loadableStream?: undefined;
  loader?: undefined;
  invalidation?: undefined;
  offlineEntry?: undefined;
}

/** package-private, only use inside 'loadable' */
interface ParamsWithLoadableStream<T> {
  loadableStream: Streamable<LoadableState<T>>;

  stream?: undefined;
  loader?: undefined;
  invalidation?: undefined;
  offlineEntry?: undefined;
}

export function createLoaderProcess<T>(
  loadable: LoadableData<T>,
  params: LoaderProcessParams<T>,
  stateContainer: StateContainer<LoadableState<T>>
) {
  if (params.stream) {
    return new StreamProcess(
      stateContainer,
      params.stream.map((value) => ({ meta: {}, value }))
    );
  }

  if (params.loadableStream) {
    return new StreamProcess(stateContainer, params.loadableStream);
  }

  const { loader, onChange } = applyOfflineHandling(loadable, params);

  return new LoaderCallbackProcess(
    stateContainer,
    loader,
    params.invalidation,
    onChange
  );
}
