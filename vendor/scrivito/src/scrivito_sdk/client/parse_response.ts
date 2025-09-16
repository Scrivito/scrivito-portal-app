import { RequestFailedError } from 'scrivito_sdk/client';
import {
  ClientError,
  ClientErrorRequestDetails,
} from 'scrivito_sdk/client/client_error';
import { parseErrorResponse } from 'scrivito_sdk/client/parse_error_response';
import { registerAsyncTask, uniqueErrorMessage } from 'scrivito_sdk/common';
import { parseOrThrowRequestFailedError } from './cms_rest_api/parse_or_throw_request_failed_error';
import { isErrorResponse } from './is_error_response';

export class AccessDeniedError extends ClientError {}

/** return the parsed JSON of the response body */
export async function parseResponse(response: Response) {
  // response.text is a macrotask in firefox.
  // it needs to be registered explicitly, to work with flushPromises.
  const responseText = await registerAsyncTask(() => response.text());
  const httpStatus = response.status;

  if (httpStatus >= 200 && httpStatus < 300) {
    if (!responseText.length) return null;
    return parseOrThrowRequestFailedError(responseText);
  }
}

/** throw suitable error, if the response is not successful */
export async function throwOnError(
  response: Response,
  requestDetails?: ClientErrorRequestDetails
): Promise<Response> {
  const httpStatus = response.status;
  if (httpStatus >= 200 && httpStatus < 300) return response;

  // response.text is a macrotask in firefox.
  // it needs to be registered explicitly, to work with flushPromises.
  const responseText = await registerAsyncTask(() => response.text());

  if (httpStatus >= 400 && httpStatus < 500) {
    const {
      message: originalMessage,
      code,
      details,
    } = parseErrorResponse(responseText);

    const message = uniqueErrorMessage(originalMessage);

    if (httpStatus === 403) throw new AccessDeniedError(message, code, details);

    throw new ClientError(message, code, details, httpStatus, requestDetails);
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
