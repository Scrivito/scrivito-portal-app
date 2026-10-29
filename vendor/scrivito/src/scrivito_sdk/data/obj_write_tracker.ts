import { ObjJson, ObjSpaceId } from 'scrivito_sdk/client';

export type ObjWriteHook = (
  objSpaceId: ObjSpaceId,
  objId: string,
  previousData: ObjJson,
) => void;

let objWriteHook: ObjWriteHook | undefined;

export function registerObjWriteHook(fn: ObjWriteHook | undefined): void {
  objWriteHook = fn;
}

export function notifyObjWrite(
  objSpaceId: ObjSpaceId,
  objId: string,
  previousData: ObjJson,
): void {
  if (objWriteHook) objWriteHook(objSpaceId, objId, previousData);
}
