import { ObjSpaceId } from 'scrivito_sdk/client';
import { objDataFor } from 'scrivito_sdk/data/obj_data_store';
import { withoutLoading } from 'scrivito_sdk/loadable';

/** get the version of Obj for the purpose of invalidation */
export function getObjVersion(objSpaceId: ObjSpaceId, objId: string): string {
  return withoutLoading(
    () => objDataFor(objSpaceId, objId).getAttribute('_version') || ''
  );
}
