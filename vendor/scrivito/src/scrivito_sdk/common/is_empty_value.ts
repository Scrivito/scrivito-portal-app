import { isEmpty, isString } from 'underscore';

export function isEmptyValue(value: unknown) {
  return (
    value === null ||
    ((isString(value) || Array.isArray(value)) && isEmpty(value))
  );
}
