import { InternalError } from 'scrivito_sdk/common';

export function assumePresence<T>(value: T | undefined | null): T {
  if (value === undefined || value === null) throw new InternalError();

  return value;
}
