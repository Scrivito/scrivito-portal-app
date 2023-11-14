import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { Locale } from 'scrivito_sdk/app_ui_protocol';

/** @public */
export function editorLanguage(): Locale | null {
  return uiAdapter?.getUiLanguage() || null;
}
