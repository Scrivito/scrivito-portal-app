import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';

/** @public */
export function openDialog(name: string): void {
  if (uiAdapter) uiAdapter.openCustomDialog(name);
}
