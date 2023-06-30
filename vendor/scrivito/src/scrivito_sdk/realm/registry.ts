import { findKey, pick } from 'underscore';

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

export function registerClass(name: string, klass: AppClass): void {
  mapping[name] = klass;
}

/** @public */
export function getClass(name: string): AppClass | null {
  return mapping[name] || null;
}

export function objClassNameFor(modelClass: AppClass): string | null {
  return findKey(mapping, (klass) => klass === modelClass) || null;
}

function appClassFor(name: string, baseClass: AppClass): AppClass {
  const appClass = getClass(name);

  return appClass && baseClass.isPrototypeOf(appClass) ? appClass : baseClass;
}

// For test purpose only
export function resetRegistry(): void {
  mapping = {};
}

export function allObjClasses(): ObjClassesByName {
  return pick(mapping, (modelClass: AppClass) => Obj.isPrototypeOf(modelClass));
}

export function allWidgetClasses(): WidgetClassesByName {
  return pick(mapping, (modelClass: AppClass) =>
    Widget.isPrototypeOf(modelClass)
  );
}

export function objClassFor(name: string): AppClass {
  return appClassFor(name, Obj);
}

export function widgetClassFor(name: string): AppClass {
  return appClassFor(name, Widget);
}
