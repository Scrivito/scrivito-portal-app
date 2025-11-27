import { isObject } from 'scrivito_sdk/common';

export type PrimitiveValue =
  | null
  | undefined
  | string
  | number
  | boolean
  | Error
  | PrimitiveObject
  | Array<PrimitiveValue>;

export interface PrimitiveObject {
  [key: string]: PrimitiveValue;
}

export function isPrimitiveObject(
  value: PrimitiveValue
): value is PrimitiveObject {
  return isObject(value) && !instanceOfClass(value);
}

function instanceOfClass(object: object): boolean {
  // Instances of class have a prototype chain of length 2 or more, e.g.
  // Instance --> SomeClass --> Object
  //
  // A primitive object has a prototype chain of length 1:
  // Instance --> Object
  //
  // Note that it would be unwise to hardcode a check for `Object`, as there are
  // multiple `Object` classes, one for each iFrame.

  const proto = Object.getPrototypeOf(object);
  if (proto === null) {
    // no prototype chain? does not happen usually, but who knows...
    return false;
  }

  // if prototype chain has length 1,
  // we assume that it's a direct instance of Object and not from some class.
  return Object.getPrototypeOf(proto) !== null;
}
