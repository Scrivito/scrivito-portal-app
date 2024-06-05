// @rewire
import {
  ObjSpaceId,
  getWorkspaceId,
  isEmptySpaceId,
} from 'scrivito_sdk/client';
import { onReset } from 'scrivito_sdk/common';
import { WorkspaceContentUpdater } from 'scrivito_sdk/data/workspace_content_updater';
import { createStateContainer } from 'scrivito_sdk/state';

interface ContentStateIds {
  [workspaceId: string]: string | undefined;
}

const contentStateIds = createStateContainer<ContentStateIds>();

export interface ContentUpdateHandler {
  getContentStateId(workspaceId: string): string | undefined;
}

let contentUpdateHandler: ContentUpdateHandler | undefined;

let workspaceContentUpdaters: {
  [key: string]: WorkspaceContentUpdater | undefined;
} = {};

export function setContentUpdateHandler(handler: ContentUpdateHandler): void {
  contentUpdateHandler = handler;
}

export function getContentStateId(objSpaceId: ObjSpaceId): string {
  if (isEmptySpaceId(objSpaceId)) return '';

  const workspaceId = getWorkspaceId(objSpaceId);
  const contentStateId = contentUpdateHandler
    ? contentUpdateHandler.getContentStateId(workspaceId)
    : getState(workspaceId).get();
  return contentStateId || '';
}

export function setContentStateId(
  workspaceId: string,
  contentStateId: string
): void {
  if (!contentUpdateHandler) {
    workspaceContentUpdaterFor(workspaceId).setContentStateIdOrThrowIfTracking(
      contentStateId
    );
  }
}

export async function trackContentStateId(workspaceId: string): Promise<void> {
  if (!contentUpdateHandler) {
    return workspaceContentUpdaterFor(workspaceId).trackContentStateId();
  }
}

export async function updateContent(workspaceId: string): Promise<void> {
  if (!contentUpdateHandler) {
    return workspaceContentUpdaterFor(workspaceId).updateContent();
  }
}

// For test purpose only
export function resetContentUpdater() {
  workspaceContentUpdaters = {};
  contentUpdateHandler = undefined;
}

function workspaceContentUpdaterFor(
  workspaceId: string
): WorkspaceContentUpdater {
  if (!workspaceContentUpdaters[workspaceId]) {
    workspaceContentUpdaters[workspaceId] = new WorkspaceContentUpdater(
      workspaceId,
      getState(workspaceId)
    );
  }
  return workspaceContentUpdaters[workspaceId]!;
}

function getState(workspaceId: string) {
  return contentStateIds.subState(workspaceId);
}

onReset(resetContentUpdater);
