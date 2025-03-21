import { BasicObj, BasicWidget } from 'scrivito_sdk/models';
import { schemaFromBasicObjOrWidget } from 'scrivito_sdk/realm';
import { extractAttribute } from './extract_attribute';
import { ExtractCollector } from './extract_collector';

export function extractTextFromBasicObjOrWidget(
  objOrWidget: BasicObj | BasicWidget,
  collector: ExtractCollector
): void {
  const schema = schemaFromBasicObjOrWidget(objOrWidget);
  if (!schema) return;

  for (const attribute of schema.extractTextAttributes()) {
    extractAttribute(objOrWidget, schema, attribute, collector);
    if (collector.isMaxLengthReached()) break;
  }
}
