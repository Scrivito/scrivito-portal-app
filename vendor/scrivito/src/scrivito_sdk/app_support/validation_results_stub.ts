import { ValidationResultObject } from 'scrivito_sdk/app_support/validations_config';
import { importFrom } from 'scrivito_sdk/import_from';
import { Obj, Widget } from 'scrivito_sdk/realm';

/** @public */
export function validationResultsFor(
  model: Obj | Widget,
  attributeName: string
): ValidationResultObject[] {
  const loadedFn = importFrom('editingSupport', 'validationResultsFor');
  if (!loadedFn) return [];

  return loadedFn(model, attributeName);
}
