import { RawResponse, RequestFailedError } from 'scrivito_sdk/client';
import { ClientError } from 'scrivito_sdk/client/client_error';
import {
  getJrRestApiEndpoint,
  isJrRestApiConfiguredForUi,
} from 'scrivito_sdk/client/jr_rest_api';
import { parseErrorResponse } from 'scrivito_sdk/client/parse_error_response';
import { currentHref, never, redirectTo } from 'scrivito_sdk/common';

const JR_REST_API_ENDPOINT_PLACEHOLDER = '$JR_API_LOCATION';

export async function requestWithLoginRedirect(
  request: () => Promise<RawResponse>
): Promise<RawResponse> {
  const response = await request();

  const { httpStatus } = response;

  if (httpStatus >= 400 && httpStatus < 500) {
    const { code, details } = parseErrorResponse(response.responseText);

    if (code === 'auth_missing') {
      if (!isAuthMissingDetails(details)) throw new RequestFailedError();

      if (isJrRestApiConfiguredForUi()) {
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
    encodeURIComponent(currentHref())
  );

  if (authUrl.includes(JR_REST_API_ENDPOINT_PLACEHOLDER)) {
    return authUrl.replace(
      JR_REST_API_ENDPOINT_PLACEHOLDER,
      await getJrRestApiEndpoint()
    );
  }

  return authUrl;
}

interface AuthMissingDetails {
  visit: string;
}

function isAuthMissingDetails(details: Object): details is AuthMissingDetails {
  return typeof (details as AuthMissingDetails).visit === 'string';
}
