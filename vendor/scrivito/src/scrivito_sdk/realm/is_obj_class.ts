import { InternalError } from 'scrivito_sdk/common';
import { Obj, ObjClass, Schema, Widget, WidgetClass } from 'scrivito_sdk/realm';

export function isObjClass(klass: ObjClass | WidgetClass): boolean {
  if (klass === Obj) return true;
  if (klass === Widget) return false;

  const schema = Schema.forClass(klass);
  if (!schema) throw new InternalError();

  return isObjClass(schema.parent());
}
