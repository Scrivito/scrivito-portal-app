import { InternalError } from 'scrivito_sdk/common';

export type ObjSpaceId =
  | WorkspaceObjSpaceId
  | RevisionObjSpaceId
  | EmptySpaceId;

export type WorkspaceObjSpaceId = ['workspace', WorkspaceId];
export type RevisionObjSpaceId = ['revision', RevisionId];
type EmptySpaceId = ['empty'];

type WorkspaceId = string;
type RevisionId = string;

export const EMPTY_SPACE: EmptySpaceId = ['empty'];

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

export function isRevisionObjSpaceId(
  spaceId: ObjSpaceId
): spaceId is RevisionObjSpaceId {
  return spaceId[0] === 'revision';
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

export function objSpaceIdsEqual(
  objSpaceId1: ObjSpaceId,
  objSpaceId2: ObjSpaceId
): boolean {
  return objSpaceId1[0] === objSpaceId2[0] && objSpaceId1[1] === objSpaceId2[1];
}
