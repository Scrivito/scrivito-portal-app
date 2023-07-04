import { contains, intersection, pick } from 'underscore';

import {
  AttributeJson,
  CustomAttributeJsonMapping,
  LinkJson,
} from 'scrivito_sdk/client';
import {
  InternalError,
  deserializeAsDate,
  deserializeAsInteger,
  isValidFloat,
} from 'scrivito_sdk/common';
import { DataLocator } from 'scrivito_sdk/data_integration';
import {
  AttributeType,
  BasicLink,
  Binary,
  getObjIncludingUnavailableFrom,
} from 'scrivito_sdk/models';
import { ContentValueProvider } from 'scrivito_sdk/models/basic_attribute_content';
import { BasicAttributeValue } from 'scrivito_sdk/models/basic_attribute_types';
import { objSpaceScopeExcludingDeleted } from 'scrivito_sdk/models/obj_space_scope_excluding_deleted';
import { BasicTypeInfo } from 'scrivito_sdk/models/type_info';

type BackendValue = AttributeJson | null | unknown;
type BackendType = keyof CustomAttributeJsonMapping;

export function deserialize<Type extends AttributeType>(
  model: ContentValueProvider,
  value: BackendValue,
  typeInfo: BasicTypeInfo<Type>
): BasicAttributeValue<Type>;
export function deserialize(
  model: ContentValueProvider,
  value: BackendValue,
  typeInfo: BasicTypeInfo<AttributeType>
): BasicAttributeValue<typeof typeInfo[0]> {
  switch (typeInfo[0]) {
    case 'binary':
      return deserializeBinaryValue(value, model);
    case 'boolean':
      return deserializeBooleanValue(value);
    case 'datalocator':
      return deserializeDataLocatorValue(value);
    case 'date':
      return deserializeDateValue(value);
    case 'datetime':
      return deserializeDateValue(value);
    case 'float':
      return deserializeFloatValue(value);
    case 'enum':
      return deserializeEnumValue(value, typeInfo);
    case 'html':
      return deserializeHtmlOrStringValue(value);
    case 'integer':
      return deserializeIntegerValue(value);
    case 'link':
      return deserializeLinkValue(value);
    case 'linklist':
      return deserializeLinklistValue(value);
    case 'multienum':
      return deserializeMultienumValue(value, typeInfo);
    case 'reference':
      return deserializeReferenceValue(value, model);
    case 'referencelist':
      return deserializeReferencelistValue(value, model);
    case 'string':
      return deserializeHtmlOrStringValue(value);
    case 'stringlist':
      return deserializeStringlistValue(value);
    case 'widget':
      return deserializeWidgetValue(value, model);
    case 'widgetlist':
      return deserializeWidgetlistValue(value, model);
    default:
      throw new InternalError();
  }
}

function deserializeBinaryValue(
  value: BackendValue,
  model: ContentValueProvider
) {
  if (isBackendValueOfType('binary', value)) {
    return new Binary(value[1].id, model.objSpaceId());
  }

  return null;
}

function deserializeBooleanValue(value: BackendValue) {
  if (isBackendValueOfType('boolean', value)) {
    return value[1];
  }

  return false;
}

function deserializeDataLocatorValue(value: BackendValue) {
  if (isBackendValueOfType('datalocator', value)) {
    return new DataLocator(value[1] || { class: null });
  }

  return new DataLocator({ class: null });
}

function deserializeDateValue(value: BackendValue) {
  if (isBackendValueOfType('date', value)) {
    return deserializeAsDate(value[1]);
  }

  return null;
}

function deserializeHtmlOrStringValue(value: BackendValue) {
  if (
    isBackendValueOfType('html', value) ||
    isBackendValueOfType('string', value)
  ) {
    return value[1];
  }

  return '';
}

function deserializeEnumValue(
  value: BackendValue,
  typeInfo: BasicTypeInfo<'enum'>
) {
  if (isBackendValueOfType('string', value)) {
    const [, valueFromBackend] = value;
    const [, { values }] = typeInfo;
    if (contains(values, valueFromBackend)) return valueFromBackend;
  }

  return null;
}

function deserializeMultienumValue(
  value: BackendValue,
  typeInfo: BasicTypeInfo<'multienum'>
) {
  if (isBackendValueOfType('stringlist', value)) {
    const [, { values }] = typeInfo;
    return intersection(value[1], values);
  }

  return [];
}

function deserializeFloatValue(value: BackendValue) {
  if (isBackendValueOfType('number', value)) {
    return convertToFloat(value[1].toString());
  }

  if (isBackendValueOfType('string', value)) {
    const [, valueFromBackend] = value;
    if (valueFromBackend.match(/^-?\d+(\.\d+)?$/)) {
      return convertToFloat(valueFromBackend);
    }
  }

  return null;
}

function convertToFloat(floatAsString: string) {
  const floatValue = parseFloat(floatAsString);

  return isValidFloat(floatValue) ? floatValue : null;
}

function deserializeIntegerValue(value: BackendValue) {
  if (
    isBackendValueOfType('number', value) ||
    isBackendValueOfType('string', value)
  ) {
    return deserializeAsInteger(value[1]);
  }

  return null;
}

function deserializeLinkValue(value: BackendValue) {
  if (isBackendValueOfType('link', value)) {
    return convertToLink(value[1]);
  }

  return null;
}

function deserializeLinklistValue(value: BackendValue) {
  if (isBackendValueOfType('linklist', value)) {
    return value[1].map(convertToLink);
  }

  return [];
}

function convertToLink(valueFromBackend: LinkJson) {
  const linkParams = pick(
    valueFromBackend,
    'query',
    'rel',
    'target',
    'title',
    'url'
  );
  if ('fragment' in valueFromBackend) {
    linkParams.hash = valueFromBackend.fragment;
  }
  if ('obj_id' in valueFromBackend) {
    linkParams.objId = valueFromBackend.obj_id;
  }
  return new BasicLink(linkParams);
}

function convertReference(
  valueFromBackend: string,
  model: ContentValueProvider
) {
  return getObjIncludingUnavailableFrom(
    objSpaceScopeExcludingDeleted(model.objSpaceId()),
    valueFromBackend
  );
}

function deserializeReferenceValue(
  value: BackendValue,
  model: ContentValueProvider
) {
  if (isBackendValueOfType('reference', value)) {
    return convertReference(value[1], model);
  }

  return null;
}

function deserializeReferencelistValue(
  value: BackendValue,
  model: ContentValueProvider
) {
  if (isBackendValueOfType('referencelist', value)) {
    return value[1].map((obj) => convertReference(obj, model));
  }

  return [];
}

function deserializeStringlistValue(value: BackendValue) {
  if (isBackendValueOfType('stringlist', value)) {
    return value[1];
  }

  return [];
}

function deserializeWidgetValue(
  value: BackendValue,
  model: ContentValueProvider
) {
  let widgetId: string | undefined;

  if (isBackendValueOfType('widget', value)) [, widgetId] = value;
  if (isBackendValueOfType('widgetlist', value)) [, [widgetId]] = value;

  return widgetId ? model.widget(widgetId) : null;
}

function deserializeWidgetlistValue(
  value: BackendValue,
  model: ContentValueProvider
) {
  if (isBackendValueOfType('widgetlist', value)) {
    return value[1].map((widgetId) => model.widget(widgetId)!);
  }

  if (isBackendValueOfType('widget', value)) {
    const [, widgetId] = value;

    if (widgetId) {
      const widget = model.widget(widgetId);
      if (widget) return [widget];
    }
  }

  return [];
}

function isBackendValueOfType<Type extends BackendType>(
  type: Type,
  value: BackendValue
): value is CustomAttributeJsonMapping[typeof type] {
  return Array.isArray(value) && value[0] === type;
}
