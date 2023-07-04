import { find, isArray } from 'underscore';

import {
  AttributeJson,
  ExistentObjJson,
  WidgetJson,
  isWidgetAttributeJson,
  isWidgetlistAttributeJson,
} from 'scrivito_sdk/client';
import { isSystemAttribute } from 'scrivito_sdk/common';

export interface WidgetPlacement {
  attributeName: string;
  attributeType: 'widgetlist' | 'widget';
  index: number;
  parentWidgetId?: string;
}

export function findWidgetPlacement(
  objData: ExistentObjJson,
  widgetId: string
): WidgetPlacement | undefined {
  let placement = findWidgetPlacementIn(objData, widgetId);

  if (placement) return placement;

  find(objData._widget_pool!, (parentWidgetData, parentWidgetId) => {
    if (parentWidgetData) {
      placement = findWidgetPlacementIn(parentWidgetData, widgetId);

      if (placement) {
        placement.parentWidgetId = parentWidgetId;

        return true;
      }
    }
  });

  return placement;
}

function findWidgetPlacementIn(
  objOrWidgetData: ExistentObjJson | WidgetJson,
  widgetId: string
): WidgetPlacement | undefined {
  let placement;

  find(objOrWidgetData, (jsonValue, attributeName) => {
    if (!jsonValue) return;

    if (isSystemAttribute(attributeName)) return;

    // Typescript cannot know that once blank and system attribute entries
    // are excluded, what's left must be a custom attribute entry, and the
    // cast is therefore safe.
    const attributeJson = jsonValue as AttributeJson;

    if (
      !isWidgetAttributeJson(attributeJson) &&
      !isWidgetlistAttributeJson(attributeJson)
    ) {
      return;
    }

    const attributeValue = attributeJson[1];

    if (isArray(attributeValue)) {
      const widgetIds = attributeJson[1];
      if (!widgetIds) return;

      const index = widgetIds.indexOf(widgetId);

      if (index !== -1) {
        placement = { attributeName, attributeType: 'widgetlist', index };
        return true;
      }
    } else {
      if (widgetId === attributeValue) {
        placement = { attributeName, attributeType: 'widget', index: 0 };
        return true;
      }
    }
  });

  return placement;
}
