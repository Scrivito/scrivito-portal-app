import { throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { getValueOrThrowError } from 'scrivito_sdk/loadable/loadable_state';
import { observeAndLoad } from 'scrivito_sdk/loadable/observe_and_load';
import { withFrozenState } from 'scrivito_sdk/state';

// load triggers the loading of all resource that the passed in
// function needs and returns a Promise to the result of the function.
//
// It can be used to convert synchronous code (the loadable function)
// into asynchronous code (Promise to the return value).
//
// A loadable function is a function that:
// * is pure, i.e. idempotent, doesn't perform I/O, is free of side-effects
//
// load will run the provided function as many times as needed,
// and trigger loading of any NotLoadedError that should occur.
//
// It returns a Promise that fulfills once the function returns a value.
// If the function throws an Exception (other than NotLoadedError),
// the Promise is rejected.

/** @public */
export function load<T>(loadableFunction: () => T): Promise<T>;

/** @internal */
export async function load<T>(loadableFunction: () => T): Promise<T> {
  checkLoad(loadableFunction);

  const observed = await observeAndLoad(() =>
    withFrozenState(
      {
        contextName: 'Scrivito.load',
        message: 'Use an async callback: await Scrivito.load(/* ... */)',
      },
      loadableFunction
    )
  )
    .filter((o) => !o.meta.incomplete && !o.meta.outdated)
    .waitForFirst();

  return getValueOrThrowError(observed);
}

function checkLoad<T>(loadableFunction: () => T) {
  if (typeof loadableFunction !== 'function') {
    throwInvalidArgumentsError(
      'Scrivito.load',
      'Use an async callback: await Scrivito.load(/* ... */)',
      { docPermalink: 'js-sdk/load' }
    );
  }
}
