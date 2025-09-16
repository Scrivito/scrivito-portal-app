import { ClientError, getIamAuthUrl } from 'scrivito_sdk/client';
import { fetchJson } from 'scrivito_sdk/client/fetch_json';
import { isAuthError } from 'scrivito_sdk/client/login_handler';
import { InternalError, fetchConfiguredTenant } from 'scrivito_sdk/common';

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
}: BrowserTokenParams): Promise<string> {
  const authLocation = await getIamAuthUrl();

  const authPath = authViaAccount
    ? `account/${authViaAccount}`
    : `instance/${authViaInstance || (await fetchConfiguredTenant())}`;

  try {
    const response = await fetchJson(`${authLocation}/${authPath}/token`, {
      params: { audience, origin },
    });

    assertTokenResponse(response);

    return response.access_token;
  } catch (error: unknown) {
    throw resolveLocationInAuthError(error, authLocation);
  }
}

function resolveLocationInAuthError(
  error: unknown,
  authLocation: string
): unknown {
  if (!isAuthError(error)) return error;

  return new ClientError(error.message, error.code, {
    visit: error.details.visit.replace('$JR_AUTH_LOCATION', authLocation),
  });
}

function assertTokenResponse(
  response: unknown
): asserts response is { access_token: string } {
  if (
    response &&
    typeof response === 'object' &&
    'access_token' in response &&
    typeof response.access_token === 'string'
  ) {
    return;
  }

  throw new InternalError();
}
