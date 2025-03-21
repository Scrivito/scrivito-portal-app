import { BasicObj } from 'scrivito_sdk/models';
import { schemaFromBasicObjOrWidget } from 'scrivito_sdk/realm';

export function isBinaryBasicObj(basicObj: BasicObj): boolean {
  const schema = schemaFromBasicObjOrWidget(basicObj);
  return !!schema && schema.isBinary();
}
