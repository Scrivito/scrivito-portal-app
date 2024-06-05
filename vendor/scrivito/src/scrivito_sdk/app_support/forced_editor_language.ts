import { createStateContainer } from 'scrivito_sdk/state';
import type { ForcedEditorLanguage } from 'scrivito_sdk/ui_interface/app_adapter';

const forcedEditorLanguage = createStateContainer<ForcedEditorLanguage>();

export function setForcedEditorLanguage(language: ForcedEditorLanguage): void {
  forcedEditorLanguage.set(language);
}

export function getForcedEditorLanguage(): ForcedEditorLanguage | undefined {
  return forcedEditorLanguage.get();
}
