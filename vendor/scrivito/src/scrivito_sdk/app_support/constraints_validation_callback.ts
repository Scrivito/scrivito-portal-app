import { AttributeValidationCallback } from 'scrivito_sdk/app_support/validations_config';
import { ScrivitoError, onReset } from 'scrivito_sdk/common';
import { Obj, Widget } from 'scrivito_sdk/realm';

export type ConstraintsValidationCallback = (
  constraints: object
) => AttributeValidationCallback<Obj | Widget>;

let constraintsValidationCallback: ConstraintsValidationCallback | undefined;

export function setConstraintsValidationCallback(
  callback: ConstraintsValidationCallback
): void {
  constraintsValidationCallback = callback;
}

export function getConstraintsValidationCallback(): ConstraintsValidationCallback {
  if (constraintsValidationCallback) {
    return constraintsValidationCallback;
  }

  throw new ScrivitoError(
    'Constraints validation callback is not configured. ' +
      'Forgot to call Scrivito.configure with the "constraintsCallback" option?'
  );
}

onReset(() => (constraintsValidationCallback = undefined));
