import { WorkspaceObjSpaceId } from 'scrivito_sdk/client';
import { onReset } from 'scrivito_sdk/common';
import { publishedSpace } from 'scrivito_sdk/models';
import { objSpaceFor } from 'scrivito_sdk/models/obj_space_for';

let objSpaceId: WorkspaceObjSpaceId | undefined;

export function currentObjSpaceId(): WorkspaceObjSpaceId {
  return objSpaceId ?? publishedSpace();
}

export function isCurrentWorkspacePublished(): boolean {
  const [type, id] = currentObjSpaceId();

  return type === 'workspace' && id === 'published';
}

/** @public */
export function currentWorkspaceId(): string {
  return currentObjSpaceId()[1];
}

export function setCurrentWorkspaceId(id: string): void {
  objSpaceId = objSpaceFor(id);
}

// For test purpose only
export function resetCurrentWorkspaceId() {
  objSpaceId = publishedSpace();
}

onReset(resetCurrentWorkspaceId);
