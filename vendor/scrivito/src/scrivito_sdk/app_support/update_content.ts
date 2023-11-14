// @rewire
import { updateContent as updateContentWithWorkspace } from 'scrivito_sdk/data';
import { currentWorkspaceId } from 'scrivito_sdk/models';

/** @public */
export function updateContent(): Promise<void> {
  return updateContentWithWorkspace(currentWorkspaceId());
}
