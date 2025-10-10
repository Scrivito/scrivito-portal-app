// @rewire
import {
  ObjSpaceId,
  WorkspaceObjSpaceId,
  isWorkspaceObjSpaceId,
} from 'scrivito_sdk/client';
import { computeCacheKey, onReset } from 'scrivito_sdk/common';
import { WorkspaceContentUpdater } from 'scrivito_sdk/data/workspace_content_updater';
import { createStateContainer } from 'scrivito_sdk/state';

interface ContentStateIds {
  [workspaceId: string]: string | undefined;
}

const contentStateIds = createStateContainer<ContentStateIds>();

export interface ContentUpdateHandler {
  getContentStateId(objSpace: WorkspaceObjSpaceId): string | undefined;
}

let contentUpdateHandler: ContentUpdateHandler | undefined;

let workspaceContentUpdaters: {
  [key: string]: WorkspaceContentUpdater | undefined;
} = {};

export function setContentUpdateHandler(handler: ContentUpdateHandler): void {
  contentUpdateHandler = handler;
}

export function getContentStateId(objSpaceId: ObjSpaceId): string {
  if (!isWorkspaceObjSpaceId(objSpaceId)) return '';

  const contentStateId = contentUpdateHandler
    ? contentUpdateHandler.getContentStateId(objSpaceId)
    : getState(objSpaceId).get();
  return contentStateId || '';
}

export function setContentStateId(
  objSpace: WorkspaceObjSpaceId,
  contentStateId: string
): void {
  if (!contentUpdateHandler) {
    workspaceContentUpdaterFor(objSpace).setContentStateIdOrThrowIfTracking(
      contentStateId
    );
  }
}

export async function trackContentStateId(
  objSpace: WorkspaceObjSpaceId
): Promise<void> {
  if (!contentUpdateHandler) {
    return workspaceContentUpdaterFor(objSpace).trackContentStateId();
  }
}

export async function updateContent(
  objSpace: WorkspaceObjSpaceId
): Promise<void> {
  if (!contentUpdateHandler) {
    return workspaceContentUpdaterFor(objSpace).updateContent();
  }
}

// For test purpose only
export function resetContentUpdater() {
  workspaceContentUpdaters = {};
  contentUpdateHandler = undefined;
}

function workspaceContentUpdaterFor(
  objSpace: WorkspaceObjSpaceId
): WorkspaceContentUpdater {
  const workspaceKey = computeCacheKey(objSpace);
  if (!workspaceContentUpdaters[workspaceKey]) {
    workspaceContentUpdaters[workspaceKey] = new WorkspaceContentUpdater(
      objSpace,
      getState(objSpace)
    );
  }
  return workspaceContentUpdaters[workspaceKey]!;
}

function getState(objSpace: WorkspaceObjSpaceId) {
  return contentStateIds.subState(computeCacheKey(objSpace));
}

onReset(resetContentUpdater);
