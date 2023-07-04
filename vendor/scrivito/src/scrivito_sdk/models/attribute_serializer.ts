import {
  compact,
  contains,
  difference,
  isDate,
  isEmpty,
  isNumber,
  isObject,
  isString,
  values as objectValues,
  without,
} from 'underscore';

import { AttributeJson } from 'scrivito_sdk/client';
import { LinkJson } from 'scrivito_sdk/client';
import {
  ArgumentError,
  formatDateToString,
  isCamelCase,
  isEmptyValue,
  isStringArray,
  isSystemAttribute,
  isValidDateString,
  isValidFloat,
  isValidInteger,
  prettyPrint,
  underscore,
} from 'scrivito_sdk/common';
import { ObjJsonPatch } from 'scrivito_sdk/data';
import { DataLocator } from 'scrivito_sdk/data_integration';
import { NormalizedBasicAttributesWithUnknownValues } from 'scrivito_sdk/models/basic_attribute_content';
import { AttributeType } from 'scrivito_sdk/models/basic_attribute_types';
import { BasicLink } from 'scrivito_sdk/models/basic_link';
import { BasicObj } from 'scrivito_sdk/models/basic_obj';
import { BasicWidget } from 'scrivito_sdk/models/basic_widget';
import { Binary } from 'scrivito_sdk/models/binary';
import { ObjUnavailable } from 'scrivito_sdk/models/obj_unavailable';
import { BasicTypeInfo } from 'scrivito_sdk/models/type_info';

type ValidLinkInputValue = BasicLink | PlainLinkObject;

interface PlainLinkObject {
  obj_id?: string | null;
  query?: string | null;
  rel?: string | null;
  target?: string | null;
  title?: string | null;
  url?: string | null;
  hash?: string | null; // corresponds to the key "fragment" of LinkJson
}

export function serialize(
  attributes: NormalizedBasicAttributesWithUnknownValues
): ObjJsonPatch {
  const serializedAttributes: ObjJsonPatch = {};

  Object.keys(attributes).forEach((name) => {
    const serializedName = convertCamelCasedAttributeName(name);

    if (isSystemAttribute(serializedName)) {
      const [value] = attributes[name] as [ObjJsonPatch[keyof ObjJsonPatch]];
      serializedAttributes[serializedName] = value;
    } else {
      const [value, typeInfo] = attributes[name];

      serializedAttributes[serializedName] = serializeAttributeEntry(
        value,
        name,
        typeInfo!
      );
    }
  });

  return serializedAttributes;
}

function serializeAttributeEntry<Type extends AttributeType>(
  value: unknown,
  name: string,
  typeInfo: BasicTypeInfo<Type>
): ObjJsonPatch[keyof ObjJsonPatch] {
  if (value === null) return null;

  const serializedEntry = serializeEntry(value, name, typeInfo);

  if (isEmptyValue(serializedEntry[1])) return null;

  return serializedEntry;
}

function serializeEntry<Type extends AttributeType>(
  value: unknown,
  name: string,
  typeInfo: BasicTypeInfo<Type>
): AttributeJson {
  switch (typeInfo[0]) {
    case 'binary':
      return ['binary', serializeBinaryAttributeValue(value, name)];
    case 'boolean':
      return ['boolean', serializeBooleanAttributeValue(value, name)];
    case 'datalocator':
      return ['datalocator', serializeDataLocatorAttributeValue(value, name)];
    case 'date':
      return ['date', serializeDateAttributeValue(value, name)];
    case 'datetime':
      return ['date', serializeDateAttributeValue(value, name)];
    case 'enum':
      return ['string', serializeEnumAttributeValue(value, name, typeInfo[1])];
    case 'float':
      return ['number', serializeFloatAttributeValue(value, name)];
    case 'html':
      return ['html', serializeHtmlAttributeValue(value, name)];
    case 'integer':
      return ['number', serializeIntegerAttributeValue(value, name)];
    case 'link':
      return ['link', serializeLinkAttributeValue(value, name)];
    case 'linklist':
      return ['linklist', serializeLinklistAttributeValue(value, name)];
    case 'multienum':
      return [
        'stringlist',
        serializeMultienumAttributeValue(value, name, typeInfo[1]),
      ];
    case 'reference':
      return ['reference', serializeReferenceAttributeValue(value, name)];
    case 'referencelist':
      return [
        'referencelist',
        serializeReferencelistAttributeValue(value, name),
      ];
    case 'string':
      return ['string', serializeStringAttributeValue(value, name)];
    case 'stringlist':
      return ['stringlist', serializeStringlistAttributeValue(value, name)];
    case 'widget':
      return ['widget', serializeWidgetAttributeValue(value, name)];
    case 'widgetlist':
      return ['widgetlist', serializeWidgetlistAttributeValue(value, name)];
    default:
      throw new ArgumentError(
        `Attribute "${name}" is of unsupported type "${typeInfo[0]}".`
      );
  }
}

function throwInvalidAttributeValue(
  value: unknown,
  name: string,
  expected: string
): never {
  throw new ArgumentError(
    `Unexpected value ${prettyPrint(value)} for` +
      ` attribute "${name}". Expected: ${expected}`
  );
}

function serializeBinaryAttributeValue(value: unknown, name: string) {
  if (value instanceof Binary) return { id: value.id() };

  throwInvalidAttributeValue(value, name, 'A Binary.');
}

function serializeBooleanAttributeValue(value: unknown, name: string) {
  if (value === false || value === true) return value;

  throwInvalidAttributeValue(value, name, 'A Boolean.');
}

function serializeDataLocatorAttributeValue(value: unknown, name: string) {
  if (value instanceof DataLocator) return value.toPojo();

  throwInvalidAttributeValue(value, name, 'A DataLocator.');
}

function serializeDateAttributeValue(value: unknown, name: string) {
  if (isDate(value)) return formatDateToString(value);

  if (isValidDateString(value)) return value;

  throwInvalidAttributeValue(value, name, 'A Date.');
}

function serializeEnumAttributeValue(
  value: unknown,
  name: string,
  { values }: { values: readonly string[] }
) {
  if (contains(values, value)) return value as string;

  const e = `Valid attribute values are contained in its "values" array [${values}].`;

  throwInvalidAttributeValue(value, name, e);
}

function serializeFloatAttributeValue(value: unknown, name: string) {
  if (isValidFloat(value)) return value;

  let invalidValue = value;

  if (isNumber(value)) {
    invalidValue = String(value);
  }

  throwInvalidAttributeValue(
    invalidValue,
    name,
    'A Number, that is #isFinite().'
  );
}

function serializeHtmlAttributeValue(value: unknown, name: string) {
  if (isString(value)) return value;

  throwInvalidAttributeValue(value, name, 'A String.');
}

function serializeIntegerAttributeValue(value: unknown, name: string) {
  if (isValidInteger(value)) return value;

  throwInvalidAttributeValue(
    value,
    name,
    'A Number, that is #isSafeInteger().'
  );
}

function serializeLinkAttributeValue(value: unknown, name: string) {
  if (isValidLinkInputValue(value)) return convertLinkToCmsApi(value);

  throwInvalidAttributeValue(
    value,
    name,
    'A Link instance with a destination.'
  );
}

function serializeLinklistAttributeValue(value: unknown, name: string) {
  if (Array.isArray(value) && value.every(isValidLinkInputValue)) {
    return value.map(convertLinkToCmsApi);
  }

  throwInvalidAttributeValue(
    value,
    name,
    'An array of Link instances with destinations set.'
  );
}

function serializeMultienumAttributeValue(
  value: unknown,
  name: string,
  { values }: { values: readonly string[] }
) {
  if (!isStringArray(value)) {
    throwInvalidAttributeValue(
      value,
      name,
      `An array with values from ${prettyPrint(values)}.`
    );
  }

  const forbiddenValues = difference(value, values);
  if (forbiddenValues.length) {
    throwInvalidAttributeValue(
      value,
      name,
      `An array with values from ${prettyPrint(
        values
      )}. Forbidden values: ${prettyPrint(forbiddenValues)}.`
    );
  }

  return value;
}

function serializeReferenceAttributeValue(value: unknown, name: string) {
  if (isValidReference(value)) return serializeSingleReferenceValue(value);

  throwInvalidAttributeValue(value, name, 'An Obj.');
}

function serializeReferencelistAttributeValue(value: unknown, name: string) {
  if (isValidReferencelistValue(value)) {
    return value.map(serializeSingleReferenceValue);
  }

  throwInvalidAttributeValue(value, name, 'An array with Objs.');
}

function serializeSingleReferenceValue(
  value: string | BasicObj | ObjUnavailable
) {
  return typeof value === 'string' ? value : value.id();
}

function isValidReference(
  value: unknown
): value is string | BasicObj | ObjUnavailable {
  return (
    isString(value) ||
    value instanceof BasicObj ||
    value instanceof ObjUnavailable
  );
}

function isValidReferencelistValue(
  value: unknown
): value is (string | BasicObj | ObjUnavailable)[] {
  return Array.isArray(value) && value.every((v) => isValidReference(v));
}

function serializeStringAttributeValue(value: unknown, name: string) {
  if (isValidString(value)) return value.toString();

  throwInvalidAttributeValue(value, name, 'A String.');
}

function serializeStringlistAttributeValue(value: unknown, name: string) {
  if (isStringOrNumberArray(value)) {
    return value.map((v) => v.toString());
  }

  throwInvalidAttributeValue(value, name, 'An array of strings.');
}

function isValidString(value: unknown): value is string | number {
  return isString(value) || isNumber(value);
}

function serializeWidgetAttributeValue(value: unknown, name: string): string {
  if (value instanceof BasicWidget) return value.id();
  throwInvalidAttributeValue(value, name, 'An instance of Widget.');
}

function serializeWidgetlistAttributeValue(
  value: unknown,
  name: string
): string[] {
  if (value instanceof BasicWidget) {
    return serializeWidgetlistAttributeValue([value], name);
  }

  if (isBasicWidgetArray(value)) return value.map((v) => v.id());

  throwInvalidAttributeValue(value, name, 'An array of Widget instances.');
}

function isBasicWidgetArray(value: unknown): value is BasicWidget[] {
  return Array.isArray(value) && value.every((v) => v instanceof BasicWidget);
}

function isStringOrNumberArray(
  value: unknown
): value is Array<string | number> {
  return Array.isArray(value) && value.every((v) => isValidString(v));
}

function isValidLinkInputValue(value: unknown): value is ValidLinkInputValue {
  // check if value is backend compatible
  if (value instanceof BasicLink) return !value.isEmpty();

  if (!isObject(value)) return false;
  if (isEmpty(compact(objectValues(value)))) return false;

  const invalidKeys = without(
    Object.keys(value as { [key: string]: unknown }),
    'hash',
    'obj_id',
    'query',
    'rel',
    'target',
    'title',
    'url'
  );
  return isEmpty(invalidKeys);
}

function convertCamelCasedAttributeName(name: string) {
  if (!isCamelCase(name)) {
    throw new ArgumentError('Attribute names have to be in camel case.');
  }

  return underscore(name);
}

function convertLinkToCmsApi(value: ValidLinkInputValue): LinkJson {
  const cmsApiValue =
    value instanceof BasicLink
      ? convertBasicLinkToCmsApi(value)
      : convertLinkObjectToCmsApi(value);
  if (!cmsApiValue.rel) {
    delete cmsApiValue.rel;
  }
  return cmsApiValue;
}

function convertBasicLinkToCmsApi(basicLink: BasicLink): LinkJson {
  return {
    rel: basicLink.rel() || undefined,
    query: basicLink.query(),
    target: basicLink.target(),
    title: basicLink.title(),
    url: basicLink.url(),
    // lowercased property method
    obj_id: basicLink.objId(),
    // different property method
    fragment: basicLink.hash(),
  };
}

function convertLinkObjectToCmsApi(value: Readonly<PlainLinkObject>): LinkJson {
  return {
    obj_id: value.obj_id || null,
    query: value.query || null,
    rel: value.rel || undefined,
    target: value.target || null,
    title: value.title || null,
    url: value.url || null,
    // different property key
    fragment: value.hash || null,
  };
}
