import { RequestFailedError } from 'scrivito_sdk/client';
import { parseOrThrowRequestFailedError } from './cms_rest_api/parse_or_throw_request_failed_error';
import { ErrorResponse, isErrorResponse } from './is_error_response';

interface BackendError {
  message: string;
  code?: string;
  details: object;
}

/** parses the standard JR backend error response format
 *
 * See
 * https://docs.google.com/document/d/1rZUtyD7nPuY5aApHoTiOf9PJaWSxVxb5mXGcd6pZPDc#heading=h.dt58jqsstqr0
 */
export function parseErrorResponse(responseText: string): BackendError {
  const parsedResponse = parseOrThrowRequestFailedError(responseText);

  if (isErrorResponse(parsedResponse)) {
    const { error, code, details } = parsedResponse as ErrorResponse;

    return {
      message: error,
      code,
      details: details || {},
    };
  }

  throw new RequestFailedError();
}
