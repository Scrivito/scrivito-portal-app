import { Streamable } from 'scrivito_sdk/common';
import { LoadableState } from 'scrivito_sdk/loadable/loadable_state';
import {
  InvalidationCallback,
  LoaderCallback,
  LoaderCallbackProcess,
} from 'scrivito_sdk/loadable/loader_callback_process';
import { StreamProcess } from 'scrivito_sdk/loadable/stream_process';
import { StateContainer } from 'scrivito_sdk/state';

export type LoaderProcessOptions<T> =
  | OptionsWithLoader<T>
  | OptionsWithStream<T>
  | OptionsWithLoadableStream<T>;

interface OptionsWithLoader<T> {
  loader: LoaderCallback<T>;
  invalidation?: InvalidationCallback;

  loadableStream?: undefined;
  stream?: undefined;
}

interface OptionsWithStream<T> {
  stream: Streamable<T>;

  loadableStream?: undefined;
  loader?: undefined;
  invalidation?: undefined;
}

/** package-private, only use inside 'loadable' */
interface OptionsWithLoadableStream<T> {
  loadableStream: Streamable<LoadableState<T>>;

  stream?: undefined;
  loader?: undefined;
  invalidation?: undefined;
}

export function createLoaderProcess<T>(
  options: LoaderProcessOptions<T>,
  stateContainer: StateContainer<LoadableState<T>>
) {
  if (options.stream) {
    return new StreamProcess(
      stateContainer,
      options.stream.map((value) => ({ meta: {}, value }))
    );
  }

  if (options.loadableStream) {
    return new StreamProcess(stateContainer, options.loadableStream);
  }

  return new LoaderCallbackProcess(
    stateContainer,
    options.loader,
    options.invalidation
  );
}
