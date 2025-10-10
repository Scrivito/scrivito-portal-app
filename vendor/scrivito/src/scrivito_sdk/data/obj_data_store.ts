// @rewire
import { ExistentObjJson, ObjJson, ObjSpaceId } from 'scrivito_sdk/client';
import { ObjData } from 'scrivito_sdk/data/obj_data';
import { load } from 'scrivito_sdk/loadable';

export { clearObjDataCache } from 'scrivito_sdk/data/obj_data';

export function preloadObjData(objSpaceId: ObjSpaceId, objId: string): void {
  load(() => getObjData(objSpaceId, objId));
}

export function createObjData(
  objSpaceId: ObjSpaceId,
  objId: string,
  attributes: ExistentObjJson
): ObjData {
  const objData = objDataFor(objSpaceId, objId);
  objData.set(attributes);

  return objData;
}

export function setObjData(
  objSpaceId: ObjSpaceId,
  objId: string,
  primitiveObj: ObjJson
): void {
  objDataFor(objSpaceId, objId).set(primitiveObj);
}

export function getObjData(
  objSpaceId: ObjSpaceId,
  objId: string
): ObjData | undefined {
  const objData = objDataFor(objSpaceId, objId);

  if (!objData.ensureAvailable()) return;

  return objData;
}

/** get an ObjData instance for the given IDs, even if not yet loaded */
export function objDataFor(objSpaceId: ObjSpaceId, objId: string): ObjData {
  return new ObjData(objSpaceId, objId);
}
