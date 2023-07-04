import { isString } from 'underscore';

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}
