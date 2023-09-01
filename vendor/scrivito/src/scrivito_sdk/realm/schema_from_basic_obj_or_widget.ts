import { BasicObj, BasicWidget } from 'scrivito_sdk/models';
import { Schema, getClass } from 'scrivito_sdk/realm';

export function schemaFromBasicObjOrWidget(
  objOrWidget: BasicObj | BasicWidget
): Schema | undefined {
  const className = objOrWidget.objClass();
  if (!className) return;

  const objClass = getClass(className);
  if (!objClass) return;

  return Schema.forClass(objClass);
}
