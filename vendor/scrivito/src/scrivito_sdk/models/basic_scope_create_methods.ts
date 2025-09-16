import { BasicObj, BasicObjAttributes } from 'scrivito_sdk/models/basic_obj';

import { Binary } from 'scrivito_sdk/models/binary';
import { ObjScope } from 'scrivito_sdk/models/obj_scope';

export function createObjIn(
  scope: ObjScope,
  { _id: objId, _objClass: objClass, ...otherAttributes }: BasicObjAttributes
): BasicObj {
  const obj = scope.create(
    denormalizeSystemAttributeValue(objId) || BasicObj.generateId(),
    { _obj_class: denormalizeSystemAttributeValue(objClass) }
  );

  obj.update(otherAttributes);

  return obj;
}

export async function createObjFromFileIn(
  scope: ObjScope,
  file: File,
  attributes: BasicObjAttributes
): Promise<BasicObj> {
  const maybeId = denormalizeSystemAttributeValue(attributes._id);
  const objId = maybeId || BasicObj.generateId();

  const binary = await Binary.upload(file).intoId(objId);
  const basicObj = createObjIn(scope, {
    ...attributes,
    _id: [objId],
    blob: [binary, ['binary']],
  });
  await basicObj.finishSaving();
  return basicObj;
}

function denormalizeSystemAttributeValue(value: unknown): string | undefined {
  const maybeStringValue = Array.isArray(value) ? value[0] : value;
  return typeof maybeStringValue === 'string' ? maybeStringValue : undefined;
}
