import { underscore } from 'scrivito_sdk/common';

export function parameterizeDataClass(dataClass: string): string {
  return `${underscore(dataClass)}_id`;
}
