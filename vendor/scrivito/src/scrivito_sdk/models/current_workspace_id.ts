import { PUBLISHED_SPACE, WorkspaceObjSpaceId } from 'scrivito_sdk/client';
import { onReset } from 'scrivito_sdk/common';

let objSpaceId: WorkspaceObjSpaceId = PUBLISHED_SPACE;

export function currentObjSpaceId(): WorkspaceObjSpaceId {
  return objSpaceId;
}

export function isCurrentWorkspacePublished(): boolean {
  return objSpaceId === PUBLISHED_SPACE;
}

/** @public */
export function currentWorkspaceId(): string {
  return objSpaceId[1];
}

export function setCurrentWorkspaceId(id: string): void {
  objSpaceId = id === 'published' ? PUBLISHED_SPACE : ['workspace', id];
}

// For test purpose only
export function resetCurrentWorkspaceId() {
  objSpaceId = PUBLISHED_SPACE;
}

onReset(resetCurrentWorkspaceId);
