import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { setLoggedInIndicatorParam } from 'scrivito_sdk/client';
import {
  ScrivitoError,
  currentHref,
  getConfiguredTenant,
  onReset,
  reload,
  replaceHistoryState,
} from 'scrivito_sdk/common';

let loggedInState: boolean | undefined;

const USER_IS_LOGGED_IN_PARAM_NAME = '__scrivitoUserIsLoggedIn';

export function initializeLoggedInState(): void {
  setLoggedInIndicatorParam(USER_IS_LOGGED_IN_PARAM_NAME);

  const url = new URL(currentHref());
  const searchParams = url.searchParams;

  if (searchParams.has(USER_IS_LOGGED_IN_PARAM_NAME)) {
    loggedInState = true;
    setFlagInLocalStorage();

    searchParams.delete(USER_IS_LOGGED_IN_PARAM_NAME);
    replaceHistoryState({}, '', url.toString());

    return;
  }

  loggedInState =
    window.localStorage.getItem(isUserLoggedInStorageKey()) !== null;
}

export function isInLoggedInState() {
  if (loggedInState === undefined) {
    throw new ScrivitoError('not configured');
  }

  return loggedInState;
}

export function changeLoggedInState(state: boolean): void {
  if (state) {
    setFlagInLocalStorage();
  } else {
    window.localStorage.removeItem(isUserLoggedInStorageKey());
  }

  reload();
}

function setFlagInLocalStorage() {
  // Never write into the flag when inside UI!
  if (!uiAdapter) {
    window.localStorage.setItem(isUserLoggedInStorageKey(), '');
  }
}

function isUserLoggedInStorageKey() {
  return `SCRIVITO.${getConfiguredTenant()}.IS_USER_LOGGED_IN`;
}

onReset(() => (loggedInState = undefined));
