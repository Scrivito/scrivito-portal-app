import { pruneString } from 'scrivito_sdk/common';
import { BasicObj, BasicWidget } from 'scrivito_sdk/models';

export function extractBlobText(objOrWidget: BasicObj | BasicWidget): string {
  if (objOrWidget instanceof BasicWidget) return '';

  const text = objOrWidget.metadata().get('text');
  if (typeof text !== 'string') return '';
  return pruneString(text);
}
