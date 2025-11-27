import isDate from 'lodash-es/isDate';

import {
  ArgumentError,
  isISO8601,
  isObject,
  logError,
} from 'scrivito_sdk/common';
import { getDataClassOrThrow } from 'scrivito_sdk/data_integration';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import {
  DataAttributeConfig,
  DataAttributeDefinition,
  DataAttributeDefinitions,
  ReferenceAttributeConfig,
  isEnumAttributeConfig,
} from 'scrivito_sdk/data_integration/data_class_schema';
import { isValidDataId } from 'scrivito_sdk/data_integration/data_id';

const serializers = {
  boolean: serializeBooleanAttribute,
  date: serializeDateAttribute,
  enum: serializeEnumAttribute,
  number: serializeNumberAttribute,
  reference: serializeReferenceAttribute,
  string: serializeStringAttribute,
  unknown: (value: unknown) => value,
};

export function serializeDataAttribute({
  dataClassName,
  attributeName,
  value,
  attributes,
}: {
  dataClassName: string;
  attributeName: string;
  value: unknown;
  attributes: DataAttributeDefinitions;
}): boolean | string | number | null | unknown {
  assertNoTypedObject(dataClassName, attributeName, value);

  const attributeDefinition = attributes[attributeName];

  if (attributeDefinition) {
    const attributeType = getAttributeType(attributeDefinition);
    const serializer = serializers[attributeType];

    if (serializer) {
      return serializer(
        value,
        dataClassName,
        attributeName,
        attributeDefinition
      );
    }
  }

  return value ?? null;
}

export function deserializeDataAttribute({
  value,
  dataClassName,
  attributeName,
  attributes,
}: {
  dataClassName: string;
  attributeName: string;
  value: unknown;
  attributes: DataAttributeDefinitions;
}): boolean | number | string | Date | DataItem | null | unknown {
  assertNoTypedObject(dataClassName, attributeName, value);

  const attributeDefinition = attributes[attributeName];

  if (attributeDefinition) {
    const attributeType = getAttributeType(attributeDefinition);
    const deserializer = deserializers[attributeType];

    if (deserializer) {
      return deserializer(
        value,
        dataClassName,
        attributeName,
        attributeDefinition
      );
    }
  }

  return value ?? null;
}

function serializeBooleanAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string
) {
  if (typeof value === 'boolean') return value;
  throwTypeMismatch(dataClassName, attributeName, 'a boolean', value);
}

function serializeDateAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string
) {
  if (value === null || (typeof value === 'string' && isISO8601(value))) {
    return value;
  }

  if (isDate(value)) return value.toISOString();

  throwTypeMismatch(
    dataClassName,
    attributeName,
    'an instance of Date, an ISO8601 date string or null',
    value
  );
}

function serializeEnumAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string,
  attributeDefinition: DataAttributeDefinition
) {
  const enumValues = getEnumValues(getAttributeConfig(attributeDefinition));

  if (
    value === null ||
    (typeof value === 'string' && enumValues.includes(value))
  ) {
    return value;
  }

  throwTypeMismatch(
    dataClassName,
    attributeName,
    `one of ${JSON.stringify(enumValues)} or null`,
    value
  );
}

function serializeNumberAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string
) {
  if (value === null || typeof value === 'number') return value;
  throwTypeMismatch(dataClassName, attributeName, 'a number or null', value);
}

function serializeReferenceAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string,
  attributeDefinition: DataAttributeDefinition
) {
  if (value === null || isValidDataId(value)) return value;

  if (
    value instanceof DataItem &&
    value.dataClassName() ===
      getReferencedClassName(getAttributeConfig(attributeDefinition))
  ) {
    return value.id();
  }

  throwTypeMismatch(
    dataClassName,
    attributeName,
    `an instance of DataItem of data class "${dataClassName}", a valid data ID or null`,
    value
  );

  return null;
}

function serializeStringAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string
) {
  if (typeof value === 'string') return value;
  throwTypeMismatch(dataClassName, attributeName, 'a string', value);
}

const deserializers = {
  boolean: deserializeBooleanAttribute,
  date: deserializeDateAttribute,
  enum: deserializeEnumAttribute,
  number: deserializeNumberAttribute,
  reference: deserializeReferenceAttribute,
  string: deserializeStringAttribute,
  unknown: (value: unknown) => value,
};

function deserializeBooleanAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string
) {
  if (typeof value === 'boolean') {
    return value;
  }

  logTypeMismatch(dataClassName, attributeName, 'a boolean', value);

  return false;
}

function deserializeDateAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string
) {
  if (isEmptyStringOrNull(value)) return null;

  if (typeof value === 'string' && isISO8601(value)) {
    return new Date(value);
  }

  logTypeMismatch(
    dataClassName,
    attributeName,
    'an ISO8601 date string',
    value
  );

  return null;
}

function deserializeEnumAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string,
  attributeDefinition: DataAttributeDefinition
) {
  if (isEmptyStringOrNull(value)) return null;

  const enumValues = getEnumValues(getAttributeConfig(attributeDefinition));

  if (typeof value === 'string' && enumValues.includes(value)) {
    return value;
  }

  logTypeMismatch(
    dataClassName,
    attributeName,
    `one of ${JSON.stringify(enumValues)}`,
    value
  );

  return null;
}

function deserializeReferenceAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string,
  attributeDefinition: DataAttributeDefinition
) {
  if (isEmptyStringOrNull(value)) return null;

  if (isValidDataId(value)) {
    return (
      getDataClassOrThrow(
        getReferencedClassName(getAttributeConfig(attributeDefinition))
      ).get(value) || null
    );
  }

  logTypeMismatch(dataClassName, attributeName, 'a valid data ID', value);

  return null;
}

function deserializeNumberAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string
) {
  if (typeof value === 'number') {
    return value;
  }

  logTypeMismatch(dataClassName, attributeName, 'a number', value);

  return null;
}

function deserializeStringAttribute(
  value: unknown,
  dataClassName: string,
  attributeName: string
) {
  if (typeof value === 'string') {
    return value;
  }

  logTypeMismatch(dataClassName, attributeName, 'a string', value);

  return '';
}

function isEmptyStringOrNull(value: unknown): value is string | null {
  return value === null || value === '';
}

function getAttributeType(attributeDefinition: DataAttributeDefinition) {
  return typeof attributeDefinition === 'string'
    ? attributeDefinition
    : attributeDefinition[0];
}

function getAttributeConfig(attributeDefinition: DataAttributeDefinition) {
  if (typeof attributeDefinition !== 'string') {
    return attributeDefinition[1];
  }
}

function getEnumValues(attributeConfig?: DataAttributeConfig) {
  if (isEnumAttributeConfig(attributeConfig)) {
    return attributeConfig.values.map((valueOrConfig) =>
      typeof valueOrConfig === 'string' ? valueOrConfig : valueOrConfig.value
    );
  }

  throw new ArgumentError(
    'Enum attribute config is missing the "values" property'
  );
}

function getReferencedClassName(attributeConfig?: DataAttributeConfig) {
  if (attributeConfig && isReferenceAttributeConfig(attributeConfig)) {
    return attributeConfig.to;
  }

  throw new ArgumentError(
    'Reference attribute config is missing the "to" property'
  );
}

export function isReferenceAttributeConfig(
  attributeConfig?: DataAttributeConfig
): attributeConfig is ReferenceAttributeConfig {
  return !!(
    attributeConfig &&
    'to' in attributeConfig &&
    typeof attributeConfig.to === 'string'
  );
}

function assertNoTypedObject(
  dataClassName: string,
  attributeName: string,
  value: unknown
) {
  if (Array.isArray(value)) {
    assertNoTypedObject(dataClassName, attributeName, value[0]);
  }

  if (isObject(value) && value.hasOwnProperty('_type')) {
    throw new ArgumentError(
      `Value for attribute "${attributeName}" of data class "${dataClassName}" contains an object with property "_type"`
    );
  }
}

function logTypeMismatch(
  dataClassName: string,
  attributeName: string,
  expected: string,
  actual: unknown
) {
  if (actual === null || actual === undefined) return;
  logError(typeMismatchMessage(dataClassName, attributeName, expected, actual));
}

function throwTypeMismatch(
  dataClassName: string,
  attributeName: string,
  expected: string,
  actual: unknown
) {
  throw new ArgumentError(
    typeMismatchMessage(dataClassName, attributeName, expected, actual)
  );
}

function typeMismatchMessage(
  dataClassName: string,
  attributeName: string,
  expected: string,
  actual: unknown
) {
  return (
    `Expected attribute "${attributeName}" of data class "${dataClassName}" ` +
    `to be ${expected}, but got ${JSON.stringify(actual)}`
  );
}
