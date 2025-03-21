import { Streamable } from 'scrivito_sdk/common';
import { StateStream } from 'scrivito_sdk/loadable/observe_and_load';

export function dejitterStateStream<T>(stream: StateStream<T>): StateStream<T> {
  return new Streamable((observer) => {
    let isComplete = false;

    return stream.subscribe((state) => {
      if (state.meta.incomplete === true) {
        // once completed, we only forward complete states
        if (isComplete) return;
      } else {
        isComplete = true;
      }

      observer.next(state);
    });
  });
}
