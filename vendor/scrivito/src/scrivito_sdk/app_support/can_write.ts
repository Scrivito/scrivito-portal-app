import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { currentWorkspaceId } from 'scrivito_sdk/models';

/** @public */
export function canWrite(): boolean {
  if (!uiAdapter) return false;

  return uiAdapter.canWrite(currentWorkspaceId()) || false;
}
