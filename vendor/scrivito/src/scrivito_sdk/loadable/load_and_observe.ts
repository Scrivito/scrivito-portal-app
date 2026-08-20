import { Streamable } from 'scrivito_sdk/common';
import { getValueOrThrowError } from 'scrivito_sdk/loadable/loadable_state';
import { observeAndLoad } from 'scrivito_sdk/loadable/observe_and_load';

export function loadAndObserve<T>(fn: () => T): Streamable<T> {
  return observeAndLoad(fn)
    .filter((state) => !state.meta.incomplete)
    .map(getValueOrThrowError);
}
