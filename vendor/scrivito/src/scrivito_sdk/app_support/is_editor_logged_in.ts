import { uiAdapter } from './ui_adapter';

/** @public */
export function isEditorLoggedIn(): boolean {
  return !!uiAdapter;
}
