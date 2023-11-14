import { BasicObj, BasicWidget } from 'scrivito_sdk/models';
import { schemaFromBasicObjOrWidget } from 'scrivito_sdk/realm';

export function subWidgets(content: BasicObj | BasicWidget): BasicWidget[] {
  const contentSchema = schemaFromBasicObjOrWidget(content);
  if (!contentSchema) return [];

  const attributes = contentSchema.attributes();

  return Object.keys(attributes).reduce((memo, attrName) => {
    const [attrType] = attributes[attrName];

    if (attrType === 'widget') {
      const widget = content.get(attrName, 'widget');
      if (widget) return [...memo, widget, ...subWidgets(widget)];
    }

    if (attrType === 'widgetlist') {
      const widgets = content.get(attrName, 'widgetlist');

      return Array.prototype.concat(
        memo,
        ...widgets.map((widget) => [widget, ...subWidgets(widget)])
      );
    }

    return memo;
  }, []);
}
