import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';

// Since the layout editing feature is an experimental one, it is important to be able to remove the
// corresponding UI adapter API at any point if we decide that we don't want this feature anymore.
let isEnabled = false;

export function enableLayoutEditing(): void {
  isEnabled = true;
}

// For test purpose only
export function resetLayoutEditing(): void {
  isEnabled = false;
}

export function isLayoutEditable(): boolean {
  if (!isEnabled) return true;
  return !!uiAdapter?.isLayoutEditable();
}

export function isPageEditable(): boolean {
  if (!isEnabled) return true;
  return !!uiAdapter?.isPageEditable();
}
