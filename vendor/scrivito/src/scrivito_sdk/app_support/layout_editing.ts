import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { createStateContainer } from 'scrivito_sdk/state';

const isEnabled = createStateContainer<boolean>();

export function enableLayoutEditing(): void {
  isEnabled.set(true);
}

export function wantsLayoutEditing(): boolean {
  return !!isEnabled.get();
}

export function isLayoutEditable(): boolean {
  // Since the layout editing feature is an experimental one, it is important to be able to remove the
  // corresponding UI adapter API at any point if we decide that we don't want this feature anymore.
  if (!wantsLayoutEditing()) return true;

  return !!uiAdapter?.isLayoutEditable();
}

export function isPageEditable(): boolean {
  // Since the layout editing feature is an experimental one, it is important to be able to remove the
  // corresponding UI adapter API at any point if we decide that we don't want this feature anymore.
  if (!wantsLayoutEditing()) return true;

  return !!uiAdapter?.isPageEditable();
}
