import type { ForcedEditorLanguage } from 'scrivito_sdk/app_ui_protocol';
import { createStateContainer } from 'scrivito_sdk/state';

const forcedEditorLanguage = createStateContainer<ForcedEditorLanguage>();

export function setForcedEditorLanguage(language: ForcedEditorLanguage): void {
  forcedEditorLanguage.set(language);
}

export function getForcedEditorLanguage(): ForcedEditorLanguage | undefined {
  return forcedEditorLanguage.get();
}
