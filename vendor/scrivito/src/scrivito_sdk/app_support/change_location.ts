// @rewire
import * as URI from 'urijs';

import { currentOrigin } from 'scrivito_sdk/app_support/current_origin';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { InternalError, openWindow, redirectTo } from 'scrivito_sdk/common';
import { isLocalUri } from './routing';

export function changeLocation(url: string): void {
  if (uiAdapter) {
    // change the location of the parent, to avoid CSP errors.
    uiAdapter.navigateToExternalUrl(url);
  } else {
    redirectTo(url);
  }
}

export function openInNewWindow(url: string): void {
  if (uiAdapter && isLocalUri(URI(url))) {
    uiAdapter.openInNewUiWindow(convertToAbsoluteLocalUrl(url));
  } else {
    openWindow(url, '_blank');
  }
}

function convertToAbsoluteLocalUrl(url: string) {
  const origin = currentOrigin();
  if (origin === undefined) throw new InternalError();
  return new URI(url).origin(origin).toString();
}
