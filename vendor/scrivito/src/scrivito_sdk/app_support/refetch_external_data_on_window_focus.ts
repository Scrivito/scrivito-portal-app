import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { observeWindowFocus, subscribeWindowFocus } from 'scrivito_sdk/common';
import { invalidateExternalData } from 'scrivito_sdk/data_integration';

export function refetchExternalDataOnWindowFocus(): void {
  if (uiAdapter) {
    uiAdapter.windowFocusStream().subscribe(invalidateExternalData);
  } else {
    observeWindowFocus();
    subscribeWindowFocus(invalidateExternalData);
  }
}
