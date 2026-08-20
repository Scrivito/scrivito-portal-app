import { getIamAuthUrl } from 'scrivito_sdk/client';
import {
  assignLocation,
  currentHref,
  never,
  onReset,
} from 'scrivito_sdk/common';

/** a LoginHander which redirects the browser to the login url */
export async function loginRedirectHandler(
  visit: string,
  idp?: string,
  prompt?: 'create',
): Promise<never> {
  assignLocation(await authenticationUrl(visit, idp, prompt));

  return never();
}

let globalIdp: string | undefined;

export function setIdentityProvider(idp?: string): void {
  globalIdp = idp;
}

// for testing purposes only
export function getIdentityProvider(): string | undefined {
  return globalIdp;
}

let loggedInParamName: string | undefined;

export function setLoggedInIndicatorParam(paramName: string): void {
  loggedInParamName = paramName;
}

async function authenticationUrl(
  visit: string,
  idp?: string,
  prompt?: 'create',
): Promise<string> {
  const authUrl = visit
    .replace('$RETURN_TO', encodeURIComponent(returnToUrl()))
    .replace('$JR_API_LOCATION/iam/auth', await getIamAuthUrl());

  const identityProvider = globalIdp || idp;
  if (!identityProvider && !prompt) return authUrl;

  const authUrlWithParams = new URL(authUrl);

  if (identityProvider) {
    authUrlWithParams.searchParams.set('idp', identityProvider);
  }

  if (prompt) {
    authUrlWithParams.searchParams.set('prompt', prompt);
  }

  return authUrlWithParams.toString();
}

function returnToUrl() {
  const url = new URL(currentHref());

  if (loggedInParamName) url.searchParams.set(loggedInParamName, '');

  return url.toString();
}

onReset(() => {
  globalIdp = undefined;
  loggedInParamName = undefined;
});
