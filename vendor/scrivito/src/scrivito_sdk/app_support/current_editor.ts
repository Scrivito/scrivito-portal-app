import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import type { Editor } from 'scrivito_sdk/editing_support';
import { importFrom } from 'scrivito_sdk/import_from';

/** @public */
export function currentEditor(): Editor | null {
  if (!uiAdapter) return null;

  const userData = uiAdapter.currentEditor();
  const teamsData = uiAdapter.currentEditorTeams();

  const Editor = importFrom('editingSupport', 'Editor');
  if (!Editor) return null;

  return userData && teamsData ? new Editor(userData, teamsData) : null;
}
