import { Iterator } from 'scrivito_sdk/common';
import { runAndCatchErrorsWhileLoading } from 'scrivito_sdk/loadable';

interface LoadAllUntilResult<T> {
  done: boolean;
  objs: T[];
}

export function loadAllUntil<T>(
  iterator: Iterator<T>,
  size: number,
  objs: T[] = []
): LoadAllUntilResult<T> {
  const run = runAndCatchErrorsWhileLoading(() => iterator.next());

  if (!run.allDataLoaded) {
    return { done: false, objs };
  }

  const next = run.result;

  if (next.done || size === 0) {
    return { done: !!next.done, objs };
  }

  return loadAllUntil(iterator, size - 1, objs.concat([next.value]));
}
