import { InternalError } from 'scrivito_sdk/common';
import { uiAdapter } from './ui_adapter';

/** get the uiAdapter, if you are sure that you in inside the UI */
export function presentUiAdapter() {
  if (!uiAdapter) throw new InternalError();

  return uiAdapter;
}
