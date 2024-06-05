import isDate from 'lodash-es/isDate';
import isObject from 'lodash-es/isObject';

import { ArgumentError, logError } from 'scrivito_sdk/common';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import {
  DataAttributeConfig,
  DataAttributeDefinition,
  DataAttributeDefinitionWithConfig,
  EnumAttributeConfig,
  ReferenceAttributeConfig,
  getDataClassSchema,
} from 'scrivito_sdk/data_integration/data_class_schema';
import { isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import { getDataClassOrThrow } from 'scrivito_sdk/data_integration/get_data_class';

const serializers = {
  boolean: serializeBooleanAttribute,
  date: serializeDateAttribute,
  enum: serializeEnumAttribute,
  number: serializeNumberAttribute,
  reference: serializeReferenceAttribute,
  string: serializeStringAttribute,
};

export function serializeDataAttribute(
  dataClassName: string,
  attributeName: string,
  value: unknown
): boolean | string | number | null | unknown {
  assertNoTypedObject(dataClassName, attributeName, value);

  const attributeDefinition = getAttributeDefinition(
    dataClassName,
    attributeName
  );

  if (attributeDefinition) {
    const attributeType = getAttributeType(attributeDefinition);
    const serializer = serializers[attributeType];

    return serializer(dataClassName, attributeName, value, attributeDefinition);
  }

  return value ?? null;
}

export function deserializeDataAttribute(
  dataClassName: string,
  attributeName: string,
  value: unknown
): boolean | number | string | Date | DataItem | null | unknown {
  assertNoTypedObject(dataClassName, attributeName, value);

  const attributeDefinition = getAttributeDefinition(
    dataClassName,
    attributeName
  );

  if (attributeDefinition) {
    const attributeType = getAttributeType(attributeDefinition);
    const deserializer = deserializers[attributeType];

    return deserializer(
      dataClassName,
      attributeName,
      value,
      attributeDefinition
    );
  }

  return value ?? null;
}

function serializeBooleanAttribute(
  dataClassName: string,
  attributeName: string,
  value: unknown
) {
  if (typeof value === 'boolean') return value;
  throwTypeMismatch(dataClassName, attributeName, 'a boolean', value);
}

function serializeDateAttribute(
  dataClassName: string,
  attributeName: string,
  value: unknown
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
  dataClassName: string,
  attributeName: string,
  value: unknown,
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
  dataClassName: string,
  attributeName: string,
  value: unknown
) {
  if (value === null || typeof value === 'number') return value;
  throwTypeMismatch(dataClassName, attributeName, 'a number or null', value);
}

function serializeReferenceAttribute(
  dataClassName: string,
  attributeName: string,
  value: unknown,
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
  dataClassName: string,
  attributeName: string,
  value: unknown
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
};

function deserializeBooleanAttribute(
  dataClassName: string,
  attributeName: string,
  value: unknown
) {
  if (typeof value === 'boolean') {
    return value;
  }

  logTypeMismatch(dataClassName, attributeName, 'a boolean', value);

  return false;
}

function deserializeDateAttribute(
  dataClassName: string,
  attributeName: string,
  value: unknown
) {
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
  dataClassName: string,
  attributeName: string,
  value: unknown,
  attributeDefinition: DataAttributeDefinition
) {
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
  dataClassName: string,
  attributeName: string,
  value: unknown,
  attributeDefinition: DataAttributeDefinition
) {
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
  dataClassName: string,
  attributeName: string,
  value: unknown
) {
  if (typeof value === 'number') {
    return value;
  }

  logTypeMismatch(dataClassName, attributeName, 'a number', value);

  return null;
}

function deserializeStringAttribute(
  dataClassName: string,
  attributeName: string,
  value: unknown
) {
  if (typeof value === 'string') {
    return value;
  }

  logTypeMismatch(dataClassName, attributeName, 'a string', value);

  return '';
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

function isISO8601(value: string) {
  return (
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value
  );
}

function getAttributeDefinition(dataClassName: string, attributeName: string) {
  return getDataClassSchema(dataClassName)[attributeName];
}

function getEnumValues(attributeConfig?: DataAttributeConfig) {
  if (attributeConfig && isEnumAttributeConfig(attributeConfig)) {
    return attributeConfig.values;
  }

  throw new ArgumentError(
    'Enum attribute config is missing the "values" property'
  );
}

function isEnumAttributeConfig(
  config: DataAttributeDefinitionWithConfig[1]
): config is EnumAttributeConfig {
  return 'values' in config && Array.isArray(config.values);
}

function getReferencedClassName(attributeConfig?: DataAttributeConfig) {
  if (attributeConfig && isReferenceAttributeConfig(attributeConfig)) {
    return attributeConfig.to;
  }

  throw new ArgumentError(
    'Reference attribute config is missing the "to" property'
  );
}

function isReferenceAttributeConfig(
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

  if (isObject(value) && value.hasOwnProperty('type')) {
    throw new ArgumentError(
      `Value for attribute "${attributeName}" of data class "${dataClassName}" ` +
        'contains an object with property "type"'
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
    `to be ${expected}", but got ${JSON.stringify(actual)}`
  );
}
