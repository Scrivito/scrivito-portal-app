import { RawResponse, RequestFailedError } from 'scrivito_sdk/client';
import { ClientError } from 'scrivito_sdk/client/client_error';
import { parseErrorResponse } from 'scrivito_sdk/client/parse_error_response';
import { uniqueErrorMessage } from 'scrivito_sdk/common';
import { parseOrThrowRequestFailedError } from './cms_rest_api/parse_or_throw_request_failed_error';
import { isErrorResponse } from './is_error_response';

export class AccessDeniedError extends ClientError {}

/** return the parsed JSON for a successful response, or throw an error */
export async function parseResponse({ httpStatus, responseText }: RawResponse) {
  if (httpStatus >= 200 && httpStatus < 300) {
    return parseOrThrowRequestFailedError(responseText);
  }

  if (httpStatus >= 400 && httpStatus < 500) {
    const {
      message: originalMessage,
      code,
      details,
    } = parseErrorResponse(responseText);

    const message = uniqueErrorMessage(originalMessage);

    if (httpStatus === 403) throw new AccessDeniedError(message, code, details);

    throw new ClientError(message, code, details);
  }

  // The backend server responds with a proper error text on a server error.
  // If however not the backend server, but the surrounding infrastructure fails, then there is
  // no proper error text. In that case include the response text as a hint for debugging.
  const parsedResponse = parseOrThrowRequestFailedError(responseText);

  const message =
    httpStatus === 500 && isErrorResponse(parsedResponse)
      ? parsedResponse.error
      : responseText;

  throw new RequestFailedError(uniqueErrorMessage(message));
}
