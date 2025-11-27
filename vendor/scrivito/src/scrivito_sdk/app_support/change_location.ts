// @rewire
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import {
  InternalError,
  assignLocation,
  currentOrigin,
  openWindow,
  replaceLocation,
} from 'scrivito_sdk/common';
import { isOriginLocal } from './routing';

export function redirectToUrl(url: string): void {
  if (uiAdapter) changeLocation(url);
  else replaceLocation(url);
}

export function changeLocation(url: string): void {
  if (uiAdapter) {
    // change the location of the parent, to avoid CSP errors.
    uiAdapter.navigateToExternalUrl(url);
  } else {
    assignLocation(url);
  }
}

export function openInNewWindow(url: string): void {
  if (uiAdapter && isOriginLocal(url)) {
    uiAdapter.openInNewUiWindow(convertToAbsoluteLocalUrl(url));
  } else {
    openWindow(url, '_blank');
  }
}

function convertToAbsoluteLocalUrl(url: string) {
  const origin = currentOrigin();
  if (origin === undefined) throw new InternalError();
  return new URL(url, origin).href;
}
