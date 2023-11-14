import {
  LoadableData,
  LoadableState,
  isCurrentlyCapturing,
} from 'scrivito_sdk/loadable';
import { dejitterStateStream } from 'scrivito_sdk/loadable/dejitter_state_stream';
import { observeAndLoad } from 'scrivito_sdk/loadable/observe_and_load';
import { createStateContainer } from 'scrivito_sdk/state';

interface FunctionState<T> {
  [serializedArgs: string]: LoadableState<T>;
}

/** Wrap the given function so that it uses a "loadable" cache.
 *
 * If the function is called with a loadable context (e.g. inside load or connect),
 * caching will automatically be used.
 *
 * Outside of a loadable context, the function will be called without caching,
 * i.e. as a normal JS function.
 *
 * Caching has several effects:
 * * The function is computed asynchronously ("in the background").
 * * The function is cached, i.e. several consumers can use the function with
 *   the same input, but only one computation takes place for each unique input.
 * * Once completely loaded, the function does not "jitter",
 *   i.e. no temporary incomplete results are shown.
 *
 * While the function is loading, the 'defaultValue' is returned.
 *
 * If the function has parameters, an 'argsToString' function must be provided,
 * which maps each unique input to a unique string (which is used as the cache key).
 *
 * It is recommended to use primitive parameters, e.g. an obj ID instead of a `BasicObj` instance.
 */
export function loadableFunction<Args extends unknown[], Return>(
  defaultValue: Return,
  argsToString: (...args: Args) => string,
  fn: (...args: Args) => Return
): (...args: Args) => Return;
export function loadableFunction<Return>(
  defaultValue: Return,
  zeroArgsFn?: () => Return
): () => Return;
export function loadableFunction<Args extends unknown[], Return>(
  defaultValue: Return,
  argsToStringOrZeroArgsFn:
    | ((...args: Args) => string)
    | ((...args: Args) => Return),
  fn?: (...args: Args) => Return
): (...args: Args) => Return {
  if (!fn) {
    const zeroArgsFn = argsToStringOrZeroArgsFn as (...args: Args) => Return;

    return createLoadableFunction(defaultValue, () => '', zeroArgsFn);
  }

  const argsToString = argsToStringOrZeroArgsFn as (...args: Args) => string;

  return createLoadableFunction(defaultValue, argsToString, fn);
}

function createLoadableFunction<Args extends unknown[], Return>(
  defaultValue: Return,
  argsToString: (...args: Args) => string,
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const functionState = createStateContainer<FunctionState<Return>>();

  return (...args: Args) => {
    if (!isCurrentlyCapturing()) return fn(...args);

    const data = new LoadableData({
      state: functionState.subState(argsToString(...args)),
      loadableStream: dejitterStateStream(observeAndLoad(() => fn(...args))),
    });

    return data.getWithDefault(defaultValue);
  };
}
