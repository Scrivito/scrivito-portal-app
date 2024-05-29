import { anonymousVisitorAuthHandler } from 'scrivito_sdk/app_support/anonymous_visitor_auth_handler';
import { insideUiAuthHandler } from 'scrivito_sdk/app_support/inside_ui_auth_handler';
import { isInLoggedInState } from 'scrivito_sdk/app_support/logged_in_state';
import { loggedInVisitorAuthHandler } from 'scrivito_sdk/app_support/logged_in_visitor_auth_handler';
import { nodeAdapter } from 'scrivito_sdk/app_support/node_adapter';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { User } from 'scrivito_sdk/app_support/user';
import { getIamAuthUrl } from 'scrivito_sdk/client';
import { assignLocation } from 'scrivito_sdk/common';

/** @public */
export function currentUser(): User | null {
  const userData = authHandler().getUserData();

  return userData ? new User(userData) : null;
}

/** @public */
export function isUserLoggedIn(): boolean {
  return authHandler().isUserLoggedIn();
}

/** @public */
export function ensureUserIsLoggedIn(): void {
  return authHandler().ensureUserIsLoggedIn();
}

export function getIamAuthProvider() {
  return authHandler().iamAuthProvider();
}

export function getLoginHandler() {
  return authHandler().loginHandler();
}

/** @public */
export function logout(returnTo?: string): void {
  logoutAsync(returnTo);
}

async function logoutAsync(returnTo?: string) {
  const url = await getIamAuthUrl('logout');
  assignLocation(
    returnTo ? `${url}?return_to=${encodeURIComponent(returnTo)}` : url
  );
}

function authHandler() {
  if (nodeAdapter) return nodeAdapter.nodeAuthHandler;
  if (uiAdapter) return insideUiAuthHandler;
  if (isInLoggedInState()) return loggedInVisitorAuthHandler;

  return anonymousVisitorAuthHandler;
}
