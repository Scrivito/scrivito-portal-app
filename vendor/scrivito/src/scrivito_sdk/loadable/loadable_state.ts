export type LoadableVersion = string | number;
export type LoadableMeta = AvailableMeta | ErrorMeta;

interface AvailableMeta {
  incomplete?: boolean;
  outdated?: boolean;
  error?: undefined;
  version?: LoadableVersion;
}

export interface StateAvailable<T> {
  meta: AvailableMeta;
  value: T;
}

interface ErrorMeta {
  incomplete?: boolean;
  outdated?: boolean;
  error: unknown;
  version?: LoadableVersion;
}

interface StateError {
  meta: ErrorMeta;
  value?: undefined;
}

export type LoadableState<T> = StateAvailable<T> | StateError;

export function getValueOrThrowError<T>(state: LoadableState<T>): T {
  throwIfErrorState(state);

  return state.value;
}

export function isAvailableState<T>(
  state: LoadableState<T>
): state is StateAvailable<T> {
  return state.meta.error === undefined;
}

function throwIfErrorState<T>(
  state: LoadableState<T>
): asserts state is StateAvailable<T> {
  throwIfErrorMeta(state.meta);
}

export function throwIfErrorMeta(
  meta: LoadableMeta
): asserts meta is AvailableMeta {
  if (meta.error !== undefined) throw meta.error;
}
