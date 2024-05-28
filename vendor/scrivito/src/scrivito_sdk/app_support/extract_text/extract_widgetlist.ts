import { BasicWidget } from 'scrivito_sdk/models';
import { ExtractCollector } from './extract_collector';
import { extractTextFromBasicObjOrWidget } from './extract_text_from_basic_obj_or_widget';

export function extractWidgetlist(
  widgetlist: BasicWidget[],
  collector: ExtractCollector
): void {
  for (const widget of widgetlist) {
    extractTextFromBasicObjOrWidget(widget, collector);
    if (collector.isMaxLengthReached()) break;
  }
}
