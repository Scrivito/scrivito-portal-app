import { ObjSpaceId } from 'scrivito_sdk/client';
import { excludeDeletedObjs } from 'scrivito_sdk/models/exclude_deleted_objs';
import { ObjScope, objSpaceScope } from 'scrivito_sdk/models/obj_scope';

export function objSpaceScopeExcludingDeleted(
  objSpaceId: ObjSpaceId
): ObjScope {
  return objSpaceScope(objSpaceId).and(excludeDeletedObjs);
}
