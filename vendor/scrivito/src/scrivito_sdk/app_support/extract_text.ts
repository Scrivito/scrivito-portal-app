import { throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { isWrappingBasicObj } from 'scrivito_sdk/models';
import { unwrapAppClass } from 'scrivito_sdk/realm';
import { Obj } from 'scrivito_sdk/realm/obj';
import { extractTextFromBasicObj } from './extract_text_from_basic_obj';

/** @public */
export function extractText(obj: Obj, options?: { length?: number }): string {
  checkExtractText(obj);
  const basicObj = unwrapAppClass(obj);
  const maxLength = options && options.length ? options.length : 1_000_000_000;
  return extractTextFromBasicObj(basicObj, maxLength);
}

function checkExtractText(obj: Obj, options?: { length?: number }): void {
  if (!isWrappingBasicObj(obj)) {
    throwInvalidArgumentsError(
      'extractText',
      "'obj' must be an instance of 'Obj'.",
      { docPermalink: 'js-sdk/extractText' }
    );
  }
  if (
    options?.length &&
    !(Number.isInteger(options.length) || options.length > 0)
  ) {
    throwInvalidArgumentsError(
      'extractText',
      "'length' must be a positive integer.",
      { docPermalink: 'js-sdk/extractText' }
    );
  }
}
