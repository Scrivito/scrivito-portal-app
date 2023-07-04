import { RawResponse, RequestFailedError } from 'scrivito_sdk/client';
import { ClientError } from 'scrivito_sdk/client/client_error';
import {
  getJrRestApiEndpoint,
  isJrRestApiConfiguredForUi,
} from 'scrivito_sdk/client/jr_rest_api';
import { parseErrorResponse } from 'scrivito_sdk/client/parse_error_response';
import { parseResponse } from 'scrivito_sdk/client/parse_response';
import {
  requestWithRateLimitRetry,
  retryOnRequestFailed,
} from 'scrivito_sdk/client/retry';
import { currentHref, never, redirectTo } from 'scrivito_sdk/common';

export const USER_IS_LOGGED_IN_PARAM_NAME = '__scrivitoUserIsLoggedIn';

const JR_API_LOCATION_PLACEHOLDER = '$JR_API_LOCATION';

export function requestApiIdempotent(
  request: () => Promise<RawResponse>,
  withLoginRedirect = true
): Promise<unknown> {
  return retryOnRequestFailed(() =>
    requestApiNonIdempotent(request, withLoginRedirect)
  );
}

export async function requestApiNonIdempotent(
  request: () => Promise<RawResponse>,
  withLoginRedirect = true
): Promise<unknown> {
  return parseResponse(
    await requestAndHandleMissingAuth(
      () => requestWithRateLimitRetry(request),
      withLoginRedirect
    )
  );
}

async function requestAndHandleMissingAuth(
  request: () => Promise<RawResponse>,
  withLoginRedirect: boolean
): Promise<RawResponse> {
  const response = await request();

  const { httpStatus } = response;

  if (httpStatus >= 400 && httpStatus < 500) {
    const { code, details } = parseErrorResponse(response.responseText);

    if (code === 'auth_missing') {
      if (!isAuthMissingDetails(details)) throw new RequestFailedError();

      if (isJrRestApiConfiguredForUi() || !withLoginRedirect) {
        throw new ClientError('Unauthorized', code, details);
      } else {
        redirectTo(await authenticationUrlFor(details.visit));
        return never();
      }
    }
  }

  return response;
}

async function authenticationUrlFor(visit: string): Promise<string> {
  const authUrl = visit.replace(
    '$RETURN_TO',
    encodeURIComponent(returnToUrl())
  );

  if (authUrl.includes(JR_API_LOCATION_PLACEHOLDER)) {
    return authUrl.replace(
      JR_API_LOCATION_PLACEHOLDER,
      await getJrRestApiEndpoint()
    );
  }

  return authUrl;
}

function returnToUrl() {
  const url = new URL(currentHref());
  url.searchParams.set(USER_IS_LOGGED_IN_PARAM_NAME, '');

  return url.toString();
}

interface AuthMissingDetails {
  visit: string;
}

function isAuthMissingDetails(details: Object): details is AuthMissingDetails {
  return typeof (details as AuthMissingDetails).visit === 'string';
}
