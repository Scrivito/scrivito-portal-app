import { createStateContainer } from 'scrivito_sdk/state';

interface ActiveWritesState {
  count: number;
  hasErrors: boolean;
}

const state = createStateContainer<ActiveWritesState>();

function getState(): ActiveWritesState {
  return state.get() ?? { count: 0, hasErrors: false };
}

export function observeWritingPromise<T>(promise: Promise<T>): Promise<T> {
  const before = getState();
  state.set({
    count: before.count + 1,
    hasErrors: before.count > 0 ? before.hasErrors : false,
  });

  promise.then(
    () => {
      const current = getState();
      state.set({ ...current, count: current.count - 1 });
    },
    () => {
      const current = getState();
      state.set({ count: current.count - 1, hasErrors: true });
    },
  );

  return promise;
}

export function isWriting(): boolean {
  return getState().count > 0;
}

export function getWriteStatus(): { writing: boolean; hasErrors: boolean } {
  const { count, hasErrors } = getState();
  return { writing: count > 0, hasErrors };
}
