import { currentUser } from 'scrivito_sdk/app_support/current_user';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import {
  fetchLoggedUser,
  startPollingLoggedUser,
} from 'scrivito_sdk/app_support/user_logged_in_status';
import {
  USER_IS_LOGGED_IN_PARAM_NAME,
  getJrRestApiUrl,
} from 'scrivito_sdk/client';
import {
  ScrivitoPromise,
  currentHref,
  redirectTo,
  reload,
  replaceHistoryState,
} from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';

// Exported for test purpose
export const IS_USER_LOGGED_IN_STORAGE_KEY = 'SCRIVITO_IS_USER_LOGGED_IN';

let isUserLoggedInCache: boolean | undefined;

/** @public */
export function isUserLoggedIn(): boolean {
  const isLoggedIn = checkIsUserLoggedIn();
  if (isLoggedIn) startPollingLoggedUser();

  return isLoggedIn;
}

function checkIsUserLoggedIn() {
  if (uiAdapter) return true;
  if (!isUserLoggedInCached()) return false;

  verifyUserIsLoggedIn();

  return true;
}

/** @public */
export function ensureUserIsLoggedIn(): void {
  if (!uiAdapter) ensureUserIsLoggedInAsync();
}

export function detectIsUserLoggedIn(): void {
  const url = new URL(currentHref());
  const searchParams = url.searchParams;

  if (searchParams.has(USER_IS_LOGGED_IN_PARAM_NAME)) {
    isUserLoggedInCache = true;
    setFlagInLocalStorage();

    searchParams.delete(USER_IS_LOGGED_IN_PARAM_NAME);
    replaceHistoryState({}, '', url.toString());
  }
}

/** @public */
export function logout(): void {
  logoutAsync();
}

async function logoutAsync() {
  redirectTo(await getJrRestApiUrl('iam/logout'));
}

// For test purpose only
export function clearIsUserLoggedInCache(): void {
  isUserLoggedInCache = undefined;
}

async function ensureUserIsLoggedInAsync() {
  if (isUserLoggedIn()) return;

  // If the user isn't logged-in, this triggers a login redirect
  await fetchLoggedUser();
  setFlagInLocalStorage();
  reload();
}

function isUserLoggedInCached() {
  if (isUserLoggedInCache === undefined) {
    isUserLoggedInCache = isFlagPresentInLocalStorage();
  }

  return isUserLoggedInCache;
}

async function verifyUserIsLoggedIn() {
  const user = await ScrivitoPromise.race([
    load(currentUser),
    timeoutAfter30Seconds(),
  ]);

  if (user === null) {
    removeFlagFromLocalStorage();
    reload();
  }
}

function timeoutAfter30Seconds() {
  return new ScrivitoPromise((resolve) =>
    setTimeout(() => resolve(null), 30000)
  );
}

function setFlagInLocalStorage() {
  try {
    localStorage.setItem(IS_USER_LOGGED_IN_STORAGE_KEY, '');
  } catch (_e: unknown) {
    // NOOP
  }
}

function removeFlagFromLocalStorage() {
  try {
    localStorage.removeItem(IS_USER_LOGGED_IN_STORAGE_KEY);
  } catch (_e: unknown) {
    // NOOP
  }
}

function isFlagPresentInLocalStorage() {
  try {
    return localStorage.getItem(IS_USER_LOGGED_IN_STORAGE_KEY) !== null;
  } catch (_e: unknown) {
    //  If the runtime is paranoid enough to forbid the usage of `localStorage`,
    //  then they'll probably allow no cookies as well, so we're done here.
    return false;
  }
}
