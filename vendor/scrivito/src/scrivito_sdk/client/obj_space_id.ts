import { InternalError } from 'scrivito_sdk/common';

export type ObjSpaceId =
  | WorkspaceObjSpaceId
  | ['revision', string]
  | EmptySpaceId;
export type WorkspaceObjSpaceId = ['workspace', string];
type EmptySpaceId = ['empty'];

export const PUBLISHED_SPACE: WorkspaceObjSpaceId = ['workspace', 'published'];

export function getWorkspaceId(spaceId: ObjSpaceId): string {
  if (!isWorkspaceObjSpaceId(spaceId)) throw new InternalError();

  return spaceId[1];
}

export function isEmptySpaceId(spaceId: ObjSpaceId): spaceId is EmptySpaceId {
  return spaceId[0] === 'empty';
}

export function isWorkspaceObjSpaceId(
  spaceId: ObjSpaceId
): spaceId is WorkspaceObjSpaceId {
  return spaceId[0] === 'workspace';
}

export function isObjSpaceId(
  maybeObjSpaceId: ObjSpaceId | unknown
): maybeObjSpaceId is ObjSpaceId {
  if (!Array.isArray(maybeObjSpaceId)) return false;

  if (maybeObjSpaceId.length === 2) {
    const [t, id] = maybeObjSpaceId;
    return (t === 'revision' || t === 'workspace') && typeof id === 'string';
  }

  return maybeObjSpaceId.length === 1 && maybeObjSpaceId[0] === 'empty';
}

export function asBackendObjSpaceId(objSpaceId: ObjSpaceId): string {
  return objSpaceId.join(':');
}
