import {
  AttributeJson,
  ObjJson,
  isExistentObjJson,
} from 'scrivito_sdk/client/obj_json';
import { isSystemAttribute } from 'scrivito_sdk/common';

type AttributeCallback = (
  value: NonNullable<AttributeJson>,
  attributeName: string,
  widgetId?: string
) => void;

export function withEachAttributeJson(
  objJson: ObjJson,
  fn: AttributeCallback
): void {
  if (!isExistentObjJson(objJson)) return;

  Object.keys(objJson).forEach((attrName) => {
    if (!isSystemAttribute(attrName)) {
      const value = objJson[attrName] as AttributeJson;
      if (!value) return;

      fn(value, attrName);
      return;
    }

    if (attrName !== '_widget_pool') return;

    const widgetPoolJson = objJson._widget_pool;
    if (!widgetPoolJson) return;

    Object.keys(widgetPoolJson).forEach((widgetId) => {
      const widgetJson = widgetPoolJson[widgetId];
      if (!widgetJson) return;

      Object.keys(widgetJson).forEach((widgetAttrName) => {
        if (isSystemAttribute(widgetAttrName)) return;

        const value = widgetJson[widgetAttrName] as AttributeJson;
        if (!value) return;

        fn(value, widgetAttrName, widgetId);
      });
    });
  });
}
