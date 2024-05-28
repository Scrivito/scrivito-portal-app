// @rewire
import { pruneString } from 'scrivito_sdk/common';
import { BasicObj, BasicWidget } from 'scrivito_sdk/models';
import { Schema } from 'scrivito_sdk/realm';
import { extractBlobText } from './extract_blob_text';
import { ExtractCollector } from './extract_collector';
import { extractTextFromBasicObjOrWidget } from './extract_text_from_basic_obj_or_widget';
import { extractWidgetlist } from './extract_widgetlist';
import { removeHtmlTags } from './remove_html_tags';

export function extractAttribute(
  objOrWidget: BasicObj | BasicWidget,
  schema: Schema,
  attribute: string,
  collector: ExtractCollector
): void {
  if (attribute === 'blob:text') {
    return collector.push(extractBlobText(objOrWidget));
  }

  const definition = schema.attribute(attribute);
  if (!definition) return;

  const [attributeType] = definition;
  switch (attributeType) {
    case 'html':
      collector.push(removeHtmlTags(objOrWidget.get(attribute, 'html')));
      break;
    case 'string':
      collector.push(pruneString(objOrWidget.get(attribute, 'string')));
      break;
    case 'widget': {
      const widget = objOrWidget.get(attribute, 'widget');
      if (widget) extractTextFromBasicObjOrWidget(widget, collector);
      break;
    }
    case 'widgetlist':
      extractWidgetlist(objOrWidget.get(attribute, 'widgetlist'), collector);
      break;
  }
}
