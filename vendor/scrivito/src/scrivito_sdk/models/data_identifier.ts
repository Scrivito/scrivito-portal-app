import { ArgumentError } from 'scrivito_sdk/common';

/** @public */
export type DataIdentifier = string;

export function isValidDataIdentifier(key: string): key is DataIdentifier {
  return (
    (key === '_id' || !!key.match(/^[a-z]([a-z0-9]|_(?!_)){0,49}$/i)) &&
    key.slice(-1) !== '_'
  );
}

export function assertValidDataIdentifier(
  key: string
): asserts key is DataIdentifier {
  if (!isValidDataIdentifier(key)) {
    throw new ArgumentError(`Invalid data identifier "${key}"`);
  }
}
