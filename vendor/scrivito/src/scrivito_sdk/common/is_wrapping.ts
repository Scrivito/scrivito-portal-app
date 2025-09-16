import { isObject } from 'scrivito_sdk/common/is_object';

export function isWrapping<BasicClass>(
  subject: unknown,
  basicClass: new (...args: unknown[]) => BasicClass
): boolean {
  return (
    isObject(subject) &&
    '_scrivitoPrivateContent' in subject &&
    subject._scrivitoPrivateContent instanceof basicClass
  );
}
