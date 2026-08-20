import { docUrl } from 'scrivito_sdk/common';
import { ArgumentError } from 'scrivito_sdk/common/errors';
import { logError } from 'scrivito_sdk/common/logging';

export type TypeCheck = (...givenArguments: unknown[]) => void;

export function throwInvalidArgumentsError(
  functionName: string,
  errorMessage: string,
  { docPermalink, severity }: { docPermalink: string; severity?: 'warning' },
) {
  const fullErrorMessage = `Invalid arguments for '${functionName}': ${errorMessage}. Visit ${docUrl(
    docPermalink,
  )} for more information.`;

  if (severity === 'warning') {
    logError(fullErrorMessage);
  } else {
    throw new ArgumentError(fullErrorMessage);
  }
}
