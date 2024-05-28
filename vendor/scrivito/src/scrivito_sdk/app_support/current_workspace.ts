import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { Workspace, currentWorkspaceId } from 'scrivito_sdk/models';

/** @public */
export function currentWorkspace(): Workspace {
  return new Workspace(
    uiAdapter?.currentWorkspace() ?? { id: currentWorkspaceId(), title: '' }
  );
}
