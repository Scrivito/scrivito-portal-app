// @rewire
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { VisitorAuthenticationProvider } from 'scrivito_sdk/client';
import {
  ScrivitoError,
  docUrl,
  onReset,
  setTimeout,
} from 'scrivito_sdk/common';

const DOC_LINK = 'js-sdk/setVisitorIdToken';

let provider: VisitorAuthenticationProvider | undefined;
let cancelMissingTokenNotification: undefined | (() => void);

export function getVisitorAuthenticationProvider(
  visitorAuthentication?: boolean
): VisitorAuthenticationProvider | undefined {
  if (!uiAdapter && visitorAuthentication) {
    return enableVisitorAuthentication();
  }
}

function enableVisitorAuthentication() {
  provider = new VisitorAuthenticationProvider();

  const timeoutId = setTimeout(() => {
    throw new ScrivitoError(
      'Scrivito.setVisitorIdToken was not called within 30 seconds.' +
        ` Visit ${docUrl(DOC_LINK)} for more information.`
    );
  }, 30000);
  cancelMissingTokenNotification = () => clearTimeout(timeoutId);

  return provider;
}

/** @public */
export function setVisitorIdToken(token: string): void;

/** @internal */
export function setVisitorIdToken(token: string): void {
  if (uiAdapter) return;

  if (!provider) {
    throw new ScrivitoError(
      'Scrivito needs to be configured to use visitor authentication before' +
        ' Scrivito.setVisitorIdToken can be called.' +
        ` Visit ${docUrl('js-sdk/configure')}` +
        ` and ${docUrl(DOC_LINK)} for more information.`
    );
  }
  cancelAndForgetMissingTokenNotification();
  provider.setToken(token);
}

export function isVisitorAuthenticationEnabled(): boolean {
  return !!provider;
}

function cancelAndForgetMissingTokenNotification() {
  if (cancelMissingTokenNotification) {
    cancelMissingTokenNotification();
    cancelMissingTokenNotification = undefined;
  }
}

// For test purpose only
export function resetVisitorAuthentication() {
  cancelAndForgetMissingTokenNotification();
  provider = undefined;
}

onReset(resetVisitorAuthentication);
