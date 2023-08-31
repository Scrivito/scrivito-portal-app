// @rewire
import { BasicObj } from 'scrivito_sdk/models';
import { ExtractCollector } from './extract_text/extract_collector';
import { extractTextFromBasicObjOrWidget } from './extract_text/extract_text_from_basic_obj_or_widget';

export function extractTextFromBasicObj(
  obj: BasicObj,
  maxLength: number
): string {
  const collector = new ExtractCollector(maxLength);
  extractTextFromBasicObjOrWidget(obj, collector);
  return collector.toString();
}
