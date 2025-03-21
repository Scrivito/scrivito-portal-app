// @rewire
import { ObjJson, cmsRestApi } from 'scrivito_sdk/client';

import { WorkspaceJson } from 'scrivito_sdk/client/workspace_json';

interface ChangesJsonBase {
  current: string;
  workspace?: WorkspaceJson;
}

interface ChangesJsonWithoutChanges extends ChangesJsonBase {
  to?: undefined;
  objs?: undefined;
}

interface ChangesJsonWithChanges extends ChangesJsonBase {
  to: string;
  objs: '*' | ObjJson[];
}

export type ChangesJson = ChangesJsonWithChanges | ChangesJsonWithoutChanges;

export function getWorkspaceChanges(
  workspaceId: string,
  from?: string
): Promise<ChangesJson> {
  return cmsRestApi.get(`workspaces/${workspaceId}/changes`, {
    from,
  }) as Promise<ChangesJson>;
}
