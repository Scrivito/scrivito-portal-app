import {
  PositiveInteger,
  checkArgumentsFor,
  tcomb as t,
} from 'scrivito_sdk/common';
import { ObjType } from 'scrivito_sdk/models';
import { unwrapAppClass } from 'scrivito_sdk/realm';
import { Obj } from 'scrivito_sdk/realm/obj';
import { extractTextFromBasicObj } from './extract_text_from_basic_obj';

/** @public */
export function extractText(obj: Obj, options?: { length?: number }): string {
  checkExtractText(obj, options);
  const basicObj = unwrapAppClass(obj);
  const maxLength = options && options.length ? options.length : 1_000_000_000;
  return extractTextFromBasicObj(basicObj, maxLength);
}

const checkExtractText = checkArgumentsFor(
  'extractText',
  [
    ['obj', ObjType],
    ['options', t.maybe(t.interface({ length: t.maybe(PositiveInteger) }))],
  ],
  { docPermalink: 'js-sdk/extractText' }
);
