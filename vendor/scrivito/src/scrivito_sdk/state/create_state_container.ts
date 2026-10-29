import { StateContainer } from 'scrivito_sdk/state';
import { globalState } from 'scrivito_sdk/state/global_state';

declare module 'scrivito_sdk/state/global_state' {
  interface GlobalState {
    dynamic: {
      [id: string]: unknown;
    };
  }
}

let counter = 0;

export function createStateContainer<T>(): StateContainer<T> {
  counter++;

  const newState = globalState.subState('dynamic').subState(counter.toString());

  return newState as StateContainer<T>;
}
