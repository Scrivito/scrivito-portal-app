import { flatten } from 'underscore';

import { docUrl } from 'scrivito_sdk/common';
import { logError } from 'scrivito_sdk/common/error_logging';
import { ArgumentError } from 'scrivito_sdk/common/errors';
import { throwNextTick } from 'scrivito_sdk/common/next_tick';
import { prettyPrint } from 'scrivito_sdk/common/pretty_print';
import { tcomb } from 'scrivito_sdk/common/tcomb';

type ArgumentDefinition = [string, tcomb.Type<unknown>];

export type TypeCheck = (...givenArguments: unknown[]) => void;

function noop(): void {}

export function checkArgumentsFor(
  functionName: string,
  argumentsDefinitions: ArgumentDefinition[],
  options: { docPermalink: string; severity?: 'warning' }
): TypeCheck {
  if (process.env.NODE_ENV !== 'development') return noop;

  return (...givenArguments: unknown[]) => {
    let errorMessage;

    try {
      errorMessage = errorMessageForArguments(
        givenArguments,
        argumentsDefinitions
      );
    } catch (e) {
      // if the type checker crashes (e.g. due to a bug in the SDK),
      // we don't want to crash the application because of this!
      throwNextTick(e);
    }

    if (errorMessage) {
      throwInvalidArgumentsError(functionName, errorMessage, options);
    }
  };
}

export function throwInvalidArgumentsError(
  functionName: string,
  errorMessage: string,
  { docPermalink, severity }: { docPermalink: string; severity?: 'warning' }
) {
  const fullErrorMessage = `Invalid arguments for '${functionName}': ${errorMessage} Visit ${docUrl(
    docPermalink
  )} for more information.`;

  if (severity === 'warning') {
    logError(fullErrorMessage);
  } else {
    throw new ArgumentError(fullErrorMessage);
  }
}

function errorMessageForArguments(
  givenArguments: unknown[],
  argumentsDefinitions: ArgumentDefinition[]
): string | undefined {
  const numExpected = argumentsDefinitions.length;
  const numGiven = givenArguments.length;

  if (numGiven > numExpected) {
    return `Expected ${numExpected} arguments, got ${numGiven}.`;
  }

  const errors = flatten(
    argumentsDefinitions.map(([argumentName, argumentType], index) => {
      const givenArgument = givenArguments[index];

      const validation = tcomb.validate(givenArgument, argumentType);

      return validation.errors.map((error) =>
        messageForError(argumentName, error)
      );
    })
  );

  if (errors.length > 0) {
    return errors.join(' ');
  }
}

function messageForError(
  argumentName: string,
  error: tcomb.ValidationError
): string {
  const subjectDescription = subjectDescriptionForError(argumentName, error);

  if (error.actual === undefined) {
    return `Missing required ${subjectDescription}.`;
  }

  if (error.expected === tcomb.Nil) {
    return `Unexpected ${subjectDescription}.`;
  }

  return `Unexpected value for ${subjectDescription}: got ${prettyPrint(
    error.actual
  )}, expected type ${tcomb.getTypeName(error.expected)}.`;
}

function subjectDescriptionForError(
  argumentName: string,
  error: tcomb.ValidationError
): string {
  const argumentDescription = `argument '${argumentName}'`;
  if (error.path.length === 0) {
    return argumentDescription;
  }

  return `key '${error.path.join('/')}' in ${argumentDescription}`;
}
