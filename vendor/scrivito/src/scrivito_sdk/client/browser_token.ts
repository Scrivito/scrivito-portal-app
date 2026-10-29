import { ClientError, getIamAuthUrl } from 'scrivito_sdk/client';
import { FetchedToken, toFetchedToken } from 'scrivito_sdk/client/config';
import { fetchJson } from 'scrivito_sdk/client/fetch_json';
import { isAuthError } from 'scrivito_sdk/client/login_handler';
import { fetchConfiguredTenant } from 'scrivito_sdk/common';

export interface BrowserTokenParams {
  audience: string | undefined;
  origin?: string;
  authViaAccount?: string;
  authViaInstance?: string;
}

export async function fetchBrowserToken({
  audience,
  origin,
  authViaAccount,
  authViaInstance,
}: BrowserTokenParams): Promise<FetchedToken> {
  const authLocation = await getIamAuthUrl();

  const authPath = authViaAccount
    ? `account/${authViaAccount}`
    : `instance/${authViaInstance || (await fetchConfiguredTenant())}`;

  try {
    const response = await fetchJson(`${authLocation}/${authPath}/token`, {
      params: { audience, origin },
    });

    return toFetchedToken(response);
  } catch (error: unknown) {
    throw resolveLocationInAuthError(error, authLocation);
  }
}

function resolveLocationInAuthError(
  error: unknown,
  authLocation: string,
): unknown {
  if (!isAuthError(error)) return error;

  return new ClientError(error.message, error.code, {
    visit: error.details.visit.replace('$JR_AUTH_LOCATION', authLocation),
  });
}
