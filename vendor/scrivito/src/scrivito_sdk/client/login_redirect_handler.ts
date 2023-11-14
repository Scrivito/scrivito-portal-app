import { clientConfig } from 'scrivito_sdk/client';
import { currentHref, never, redirectTo } from 'scrivito_sdk/common';

/** a LoginHander which redirects the browser to the login url */
export async function loginRedirectHandler(visit: string): Promise<void> {
  redirectTo(await authenticationUrl(visit));

  return never();
}

const JR_API_LOCATION_PLACEHOLDER = '$JR_API_LOCATION';

let loggedInParamName: string | undefined;

export function setLoggedInIndicatorParam(paramName: string): void {
  loggedInParamName = paramName;
}

// For test purpose only
export function resetUserIsLoggedInParam(): void {
  loggedInParamName = undefined;
}

async function authenticationUrl(visit: string): Promise<string> {
  const authUrl = visit.replace(
    '$RETURN_TO',
    encodeURIComponent(returnToUrl())
  );

  if (authUrl.includes(JR_API_LOCATION_PLACEHOLDER)) {
    return authUrl.replace(
      JR_API_LOCATION_PLACEHOLDER,
      (await clientConfig.fetch()).jrApiLocation
    );
  }

  return authUrl;
}

function returnToUrl() {
  const url = new URL(currentHref());

  if (loggedInParamName) url.searchParams.set(loggedInParamName, '');

  return url.toString();
}
