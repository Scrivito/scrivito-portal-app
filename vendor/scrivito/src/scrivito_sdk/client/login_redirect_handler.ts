import { clientConfig } from 'scrivito_sdk/client';
import {
  InternalError,
  assignLocation,
  currentHref,
  never,
  onReset,
} from 'scrivito_sdk/common';

/** a LoginHander which redirects the browser to the login url */
export async function loginRedirectHandler(visit: string): Promise<void> {
  assignLocation(await authenticationUrl(visit));

  return never();
}

let identityProvider: string | undefined;

export function setIdentityProvider(idp?: string): void {
  identityProvider = idp;
}

// for testing purposes only
export function getIdentityProvider(): string | undefined {
  return identityProvider;
}

let loggedInParamName: string | undefined;

export function setLoggedInIndicatorParam(paramName: string): void {
  loggedInParamName = paramName;
}

async function authenticationUrl(visit: string): Promise<string> {
  let authUrl = visit.replace('$RETURN_TO', encodeURIComponent(returnToUrl()));

  const iamAuthLocation = (await clientConfig.fetch()).iamAuthLocation;
  if (!iamAuthLocation) throw new InternalError();

  authUrl = authUrl.replace('$JR_API_LOCATION/iam/auth', iamAuthLocation);
  if (!identityProvider) return authUrl;

  const authUrlWithIdp = new URL(authUrl);
  authUrlWithIdp.searchParams.set('idp', identityProvider);

  return authUrlWithIdp.toString();
}

function returnToUrl() {
  const url = new URL(currentHref());

  if (loggedInParamName) url.searchParams.set(loggedInParamName, '');

  return url.toString();
}

onReset(() => (loggedInParamName = undefined));
