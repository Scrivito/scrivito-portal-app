import { isObject } from 'scrivito_sdk/common';

export type ErrorResponse = {
  error: string;
  code?: string;
  details?: object;
};

export function isErrorResponse(
  parsedResponse: unknown
): parsedResponse is ErrorResponse {
  if (!isObject(parsedResponse)) return false;

  const errorType = typeof (parsedResponse as ErrorResponse).error;
  const codeType = typeof (parsedResponse as ErrorResponse).code;

  const details = (parsedResponse as ErrorResponse).details;

  return (
    errorType === 'string' &&
    (codeType === 'string' || codeType === 'undefined') &&
    (isObject(details) || details === undefined)
  );
}
