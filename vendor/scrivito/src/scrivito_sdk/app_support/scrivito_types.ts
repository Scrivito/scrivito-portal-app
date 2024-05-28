import { tcomb } from 'scrivito_sdk/common';
import { Obj, Widget } from 'scrivito_sdk/realm';

// a class (in the Javascript sense) is any function that can be used as a constructor.
type UnknownClass = new (...args: unknown[]) => unknown;

export const ObjClass = tcomb.irreducible('ObjClass', (maybeClass: unknown) =>
  isOrExtends(maybeClass, Obj)
);

export const WidgetClass = tcomb.irreducible(
  'WidgetClass',
  (maybeClass: unknown) => isOrExtends(maybeClass, Widget)
);

export const AppClass = tcomb.union([ObjClass, WidgetClass]);

function isOrExtends(maybeClass: unknown, klass: UnknownClass): boolean {
  if (!maybeClass) {
    return false;
  }
  if (maybeClass === klass) {
    return true;
  }

  return (maybeClass as UnknownClass).prototype instanceof klass;
}
