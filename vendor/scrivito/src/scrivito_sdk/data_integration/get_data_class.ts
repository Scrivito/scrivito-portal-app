import { ArgumentError } from 'scrivito_sdk/common';
import { DataClass } from 'scrivito_sdk/data_integration/data_class';
import { addDataClassPrefix } from 'scrivito_sdk/data_integration/data_class_name_prefix';
import {
  ExternalDataClass,
  isExternalDataClassProvided,
} from 'scrivito_sdk/data_integration/external_data_class';
import {
  ObjDataClass,
  isObjDataClassProvided,
} from 'scrivito_sdk/data_integration/obj_data_class';

/** @public */
export function getDataClass(dataClassName: string): DataClass | null {
  return (
    getExternalDataClass(dataClassName) ||
    getObjDataClass(dataClassName) ||
    null
  );
}

export function getDataClassOrThrow(dataClassName: string): DataClass {
  const dataClass = getDataClass(dataClassName);
  if (dataClass) return dataClass;

  throw new ArgumentError(`No "${dataClassName}" found`);
}

export function getObjDataClass(dataClassName: string) {
  if (dataClassName === 'Obj' || isObjDataClassProvided(dataClassName)) {
    return new ObjDataClass(dataClassName);
  }
}

function getExternalDataClass(dataClassName: string) {
  const internalName = addDataClassPrefix(dataClassName);

  if (isExternalDataClassProvided(internalName)) {
    return new ExternalDataClass(internalName);
  }
}
