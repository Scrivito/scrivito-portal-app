import mapValues from 'lodash-es/mapValues';

import {
  AttributeJson,
  ObjJson,
  ObjSpaceId,
  WidgetJson,
  isWidgetAttributeJson,
  isWidgetlistAttributeJson,
} from 'scrivito_sdk/client';
import {
  InternalError,
  isSystemAttribute,
  underscore,
} from 'scrivito_sdk/common';
import * as AttributeDeserializer from 'scrivito_sdk/models/attribute_deserializer';
import {
  AttributeType,
  BasicAttributeValue,
} from 'scrivito_sdk/models/basic_attribute_types';
import {
  BasicObj,
  BasicObjAttributes,
  SerializedObjAttributes,
} from 'scrivito_sdk/models/basic_obj';
import {
  BasicWidget,
  BasicWidgetAttributes,
  SerializedWidgetAttributes,
} from 'scrivito_sdk/models/basic_widget';
import { BasicTypeInfo, TypeInfo } from 'scrivito_sdk/models/type_info';

type CustomAttributeValueWithTypeInfo = {
  [Type in AttributeType]: [unknown, BasicTypeInfo<Type>];
}[AttributeType];

export interface NormalizedBasicAttributeDict {
  [attributeName: string]: NormalizedBasicAttributeValue;
}

export type NormalizedBasicAttributeValue =
  | CustomAttributeValueWithTypeInfo
  | [SystemAttributeValue];

type SystemAttributeValue = unknown;

export interface ContentValueProvider {
  getAttributeData(name: string, type?: AttributeType): unknown;
  getData(): WidgetJson | ObjJson | undefined | null;
  objSpaceId(): ObjSpaceId;
  widget(widgetId: string): BasicWidget | null;
}

export interface NormalizedBasicAttributesWithUnknownValues {
  [key: string]: NormalizedUnknownAttributeValue;
}

export type NormalizedUnknownAttributeValue =
  | [unknown]
  | [unknown, BasicTypeInfo<AttributeType>];

export function getContentValue<Type extends AttributeType>(
  content: ContentValueProvider,
  attributeName: string,
  typeInfo: TypeInfo<Type>
): BasicAttributeValue<Type> {
  if (typeof typeInfo === 'string') {
    const normalizedTypeInfo = [typeInfo] as TypeInfo<Type>;
    return getContentValue(content, attributeName, normalizedTypeInfo);
  }

  return getContentValueUsingInternalName(
    content,
    underscore(attributeName),
    typeInfo
  );
}

function getContentValueUsingInternalName<Type extends AttributeType>(
  content: ContentValueProvider,
  internalAttributeName: string,
  typeInfo: BasicTypeInfo<Type>
): BasicAttributeValue<Type> {
  const rawValue = content.getAttributeData(internalAttributeName, typeInfo[0]);
  return AttributeDeserializer.deserialize(content, rawValue, typeInfo);
}

export function serializeAttributes(content: BasicObj): SerializedObjAttributes;
export function serializeAttributes(
  content: BasicWidget
): SerializedWidgetAttributes;
export function serializeAttributes(
  content: ContentValueProvider
): SerializedObjAttributes | SerializedWidgetAttributes {
  return mapValues(content.getData(), (value, name) => {
    if (value && !isSystemAttribute(name) && typeof value === 'object') {
      if (isWidgetAttributeJson(value as AttributeJson)) {
        const widget = getContentValueUsingInternalName(content, name, [
          'widget',
        ]);

        return ['widget', widget ? serializeAttributes(widget) : null];
      }

      if (isWidgetlistAttributeJson(value as AttributeJson)) {
        const widgets = getContentValueUsingInternalName(content, name, [
          'widgetlist',
        ]);

        return ['widgetlist', widgets.map(serializeAttributes)];
      }
    }

    return value;
  });
}

export function persistWidgets(
  obj: BasicObj,
  attributes: NormalizedBasicAttributesWithUnknownValues
): void {
  Object.keys(attributes).forEach((key) => {
    const valueAndType = attributes[key];

    if (isWidgetAttributeValueAndType(valueAndType)) {
      valueAndType[0].persistInObjIfNecessary(obj);
    }

    if (isWidgetlistAttributeValueAndType(valueAndType)) {
      const [value] = valueAndType;
      const widgets = Array.isArray(value) ? value : [value];

      widgets.forEach((widget) => {
        widget.persistInObjIfNecessary(obj);
      });
    }
  });
}

export function isWidgetAttributeValueAndType(
  valueAndType: NormalizedUnknownAttributeValue
): valueAndType is [BasicWidget, BasicTypeInfo<'widget'>] {
  if (valueAndType.length < 2) return false;

  const [value, typeInfo] = valueAndType;
  const [type] = typeInfo!;
  if (type !== 'widget') return false;

  return value instanceof BasicWidget;
}

export function isWidgetlistAttributeValueAndType(
  valueAndType: NormalizedUnknownAttributeValue
): valueAndType is [BasicWidget | BasicWidget[], BasicTypeInfo<'widgetlist'>] {
  if (valueAndType.length < 2) return false;

  const [value, typeInfo] = valueAndType;
  const [type] = typeInfo!;
  if (type !== 'widgetlist') return false;

  if (value instanceof BasicWidget) return true;

  if (!Array.isArray(value)) return false;

  return value.every((entry) => entry instanceof BasicWidget);
}

export function normalizeAttributes(
  attributes: BasicObjAttributes | BasicWidgetAttributes
): NormalizedBasicAttributeDict {
  return mapValues(attributes, (attributeValue, name) => {
    // Note: System attribute value normalization for public API input is
    // already performed by unwrapAppAttributes. Therefore this code exists
    // only for internal callers. Which could eventually be changed to
    // specify their values that they don't need to be normalized and
    // therefore avoid this code altogether.
    if (isSystemAttribute(name)) {
      if (Array.isArray(attributeValue)) return attributeValue;

      return [attributeValue];
    }

    if (!Array.isArray(attributeValue)) {
      // Value should be a tuple: [value, typeInfo]
      throw new InternalError();
    }

    const [value, typeInfo] = attributeValue;
    if (typeof typeInfo === 'string') {
      // Note: This is not a support of an easy public value specification.
      // Instead, only some internal calls can go this way. With the help
      // of typescript and an "Implementation error" thrown here, we might
      // get rid of this special case completely. But since the gain is
      // little, there is some risk that some caller is missed, there are
      // a lot of callers, and it would extend the current PR too much, this
      // is not simplified right now. Stay tuned.
      return [value, [typeInfo]];
    }

    return [value, typeInfo];
  }) as NormalizedBasicAttributeDict;
}

/** Get the restriction from a _restriction attribute value. */
export function normalizedRestriction(
  restrictionAttribute?: string[] | null
): string {
  return restrictionAttribute ? restrictionAttribute[0] : '_public';
}
