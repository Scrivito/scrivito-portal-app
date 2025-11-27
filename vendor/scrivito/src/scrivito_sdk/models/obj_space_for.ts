import {
  ObjSpaceId,
  RevisionObjSpaceId,
  WorkspaceObjSpaceId,
} from 'scrivito_sdk/client';
import { InternalError } from 'scrivito_sdk/common';

export function objSpaceFor(workspaceId: string): WorkspaceObjSpaceId;
export function objSpaceFor(type: 'workspace', id: string): WorkspaceObjSpaceId;
export function objSpaceFor(type: 'revision', id: string): RevisionObjSpaceId;
export function objSpaceFor(idOrType: string, id?: string): ObjSpaceId {
  if (!id) return ['workspace', idOrType];

  if (idOrType === 'workspace' || idOrType === 'revision') {
    return [idOrType, id];
  }

  throw new InternalError();
}
