import { onReset } from 'scrivito_sdk/common';

import { AppClass, ObjClass, WidgetClass } from 'scrivito_sdk/realm';
import { Obj } from 'scrivito_sdk/realm/obj';
import { Widget } from 'scrivito_sdk/realm/widget';

export interface ObjClassesByName {
  [name: string]: ObjClass;
}

export interface WidgetClassesByName {
  [name: string]: WidgetClass;
}

let mapping: { [name: string]: AppClass } = {};

export function registerRealmClass(name: string, klass: AppClass): void {
  mapping[name] = klass;
}

/** @public */
export function getRealmClass(name: string): AppClass | null {
  return mapping[name] || null;
}

export function objClassNameFor(modelClass: AppClass): string | null {
  return (
    Object.keys(mapping).find((klass) => mapping[klass] === modelClass) || null
  );
}

function appClassFor(name: string, baseClass: AppClass): AppClass {
  const appClass = getRealmClass(name);

  return appClass && baseClass.isPrototypeOf(appClass) ? appClass : baseClass;
}

export function allObjClasses(): ObjClassesByName {
  return Object.fromEntries(
    Object.entries(mapping).filter(([, modelClass]) =>
      Obj.isPrototypeOf(modelClass)
    )
  ) as ObjClassesByName;
}

export function allWidgetClasses(): WidgetClassesByName {
  return Object.fromEntries(
    Object.entries(mapping).filter(([, modelClass]) =>
      Widget.isPrototypeOf(modelClass)
    )
  ) as WidgetClassesByName;
}

export function objClassFor(name: string): AppClass {
  return appClassFor(name, Obj);
}

export function widgetClassFor(name: string): AppClass {
  return appClassFor(name, Widget);
}

onReset(() => (mapping = {}));
