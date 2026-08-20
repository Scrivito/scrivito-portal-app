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

export async function parseResponseOrThrow(
  response: Response,
  requestDetails?: ClientErrorRequestDetails,
): Promise<unknown> {
  // response.text is a macrotask in firefox.
  // it needs to be registered explicitly, to work with flushPromises.
  const responseText = await registerAsyncTask(() => response.text());

  if (response.ok) {
    if (!responseText.length) return null;
    return parseOrThrowRequestFailedError(responseText);
  }

  const httpStatus = response.status;

  if (httpStatus < 500) {
    const {
      message: originalMessage,
      code,
      details,
    } = parseErrorResponse(responseText);

    const message = uniqueErrorMessage(originalMessage);

    if (httpStatus === 403) throw new AccessDeniedError(message, code, details);

    throw new ClientError(message, code, details, httpStatus, requestDetails);
  }

  const parsedResponse = parseOrThrowRequestFailedError(responseText);

  const message =
    httpStatus === 500 && isErrorResponse(parsedResponse)
      ? parsedResponse.error
      : // If surrounding infrastructure fails instead of the backend, there's no proper error text — include raw text as a debugging hint.
        responseText;

  throw new RequestFailedError(uniqueErrorMessage(message));
}
