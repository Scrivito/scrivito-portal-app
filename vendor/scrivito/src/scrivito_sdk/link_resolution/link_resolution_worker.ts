// @rewire
import { contains, isEqual } from 'underscore';
import type {
  AttributeJson,
  HtmlAttributeJson,
  LinkAttributeJson,
  LinklistAttributeJson,
} from 'scrivito_sdk/client';
import { ScrivitoPromise } from 'scrivito_sdk/common';
import { ObjData } from 'scrivito_sdk/data';
import {
  convertHtml,
  convertLink,
  convertLinklist,
} from 'scrivito_sdk/link_resolution/content_conversion';
import { load, loadableWithDefault } from 'scrivito_sdk/loadable';

export type AnyLinkResolutionAttributeJson =
  | HtmlAttributeJson
  | LinkAttributeJson
  | LinklistAttributeJson;

export function isAnyLinkResolutionAttributeJson(
  attributeData: AttributeJson
): attributeData is AnyLinkResolutionAttributeJson {
  return contains(['html', 'link', 'linklist'], attributeData[0]);
}

export function runWorker(
  attributeDataToConvert: AnyLinkResolutionAttributeJson,
  objData: ObjData,
  attributeName: string,
  widgetId?: string
): Promise<void> {
  const convertValue = getConversion(attributeDataToConvert);
  const convertedDataWithoutLoading = loadableWithDefault(
    undefined,
    convertValue
  );
  if (convertedDataWithoutLoading !== undefined) {
    if (!isEqual(convertedDataWithoutLoading, attributeDataToConvert)) {
      update(objData, attributeName, widgetId, convertedDataWithoutLoading);
    }

    return ScrivitoPromise.resolve();
  }

  return load(convertValue).then((convertedData) => {
    if (isEqual(convertedData, attributeDataToConvert)) return;

    if (
      hasDataToConvertBeenChangedConcurrently(
        attributeDataToConvert,
        objData,
        attributeName,
        widgetId
      )
    ) {
      return;
    }

    update(objData, attributeName, widgetId, convertedData);
  });
}

function hasDataToConvertBeenChangedConcurrently(
  attributeData: AnyLinkResolutionAttributeJson,
  objData: ObjData,
  attributeName: string,
  widgetId: string | undefined
) {
  const currentAttributeData = widgetId
    ? objData.getWidgetAttribute(widgetId, attributeName)
    : objData.getAttribute(attributeName);

  return !isEqual(attributeData, currentAttributeData);
}

function update(
  objData: ObjData,
  attributeName: string,
  widgetId: string | undefined,
  newData: AnyLinkResolutionAttributeJson
) {
  const patch = { [attributeName]: newData };

  if (widgetId) {
    objData.update({
      _widget_pool: {
        [widgetId]: patch,
      },
    });
  } else {
    objData.update(patch);
  }
}

// The precise type is getConversion<T extends_oneof AnyLinkResolutionAttributeJson>(attributeData: T): () => T
// See https://github.com/microsoft/TypeScript/issues/27808
function getConversion(
  attributeData: AnyLinkResolutionAttributeJson
): () => typeof attributeData {
  switch (attributeData[0]) {
    case 'html': {
      const attributeValue = attributeData[1];
      return () => ['html', convertHtml(attributeValue)];
    }
    case 'link': {
      const attributeValue = attributeData[1];
      return () => ['link', convertLink(attributeValue)];
    }
    case 'linklist': {
      const attributeValue = attributeData[1];
      return () => ['linklist', convertLinklist(attributeValue)];
    }
  }
}
