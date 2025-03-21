import { ObjScope, objSpaceScope } from 'scrivito_sdk/models';

export function emptyScope(): ObjScope {
  return objSpaceScope(['empty']);
}
