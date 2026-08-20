import { InternalError } from 'scrivito_sdk/common';

export function assumeString(value: unknown): string {
  if (typeof value !== 'string') throw new InternalError();
  return value;
}
