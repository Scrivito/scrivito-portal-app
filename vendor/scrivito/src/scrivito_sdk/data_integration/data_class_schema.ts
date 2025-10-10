import mapValues from 'lodash-es/mapValues';

import { isObject, logError } from 'scrivito_sdk/common';
import {
  LazyAsync,
  normalizeLazyAsync,
} from 'scrivito_sdk/data_integration/lazy_async';
import { createLoadableCollection } from 'scrivito_sdk/loadable';
import { createStateContainer } from 'scrivito_sdk/state';

export type LazyAsyncDataClassSchema = LazyAsync<DataClassSchema>;

type DataClassSchemaCallback = () => Promise<DataClassSchema>;

export interface DataClassSchema {
  attributes?: LazyAsyncDataAttributeDefinitions;
  title?: LazyAsyncDataClassTitle;
}

export type LazyAsyncDataAttributeDefinitions =
  LazyAsync<DataAttributeDefinitions>;

/** @public */
export interface DataAttributeDefinitions {
  [attributeName: string]: DataAttributeDefinition;
}

export type LazyAsyncDataClassTitle = LazyAsync<DataClassTitle>;

type DataClassTitle = string | undefined;

export interface DataClassSchemaResponse {
  attributes: DataAttributeDefinitions;
  title?: DataClassTitle;
}

export type DataAttributeDefinition =
  | DataAttributeDefinitionWithOptionalConfig
  | DataAttributeDefinitionWithConfig;

export interface NormalizedDataAttributeDefinitions {
  [attributeName: string]: NormalizedDataAttributeDefinition;
}

export type NormalizedDataAttributeDefinition =
  | [DataAttributeDefinitionWithOptionalConfig, object]
  | NormalizedDataAttributeDefinitionWithConfig;

export type NormalizedDataAttributeDefinitionWithConfig = {
  [T in keyof NormalizedDataAttributeConfigs]: [
    T,
    NormalizedDataAttributeConfigs[T]
  ];
}[keyof NormalizedDataAttributeConfigs];

export interface NormalizedDataAttributeConfigs extends DataAttributeConfigs {
  enum: LocalizedEnumAttributeConfig;
}

export interface LocalizedEnumAttributeConfig extends EnumAttributeConfig {
  values: Array<LocalizedEnumValueConfig>;
}

export type DataAttributeConfigs = {
  boolean: LocalizedAttributeConfig;
  date: LocalizedAttributeConfig;
  enum: EnumAttributeConfig;
  number: LocalizedAttributeConfig;
  reference: ReferenceAttributeConfig;
  string: LocalizedAttributeConfig;
  unknown: UnknownAttributeConfig;
};

type LocalizedAttributeConfig = { title?: string };

export interface EnumAttributeConfig extends LocalizedAttributeConfig {
  values: readonly EnumValueConfig[];
}

export interface ReferenceAttributeConfig extends LocalizedAttributeConfig {
  to: DataClassName;
  reverseTitle?: string;
}

export interface UnknownAttributeConfig extends LocalizedAttributeConfig {
  type?: string;
}

type DataAttributeDefinitionWithOptionalConfig = Exclude<
  DataAttributeType,
  'enum' | 'reference'
>;

export type DataAttributeDefinitionWithConfig = {
  [T in keyof DataAttributeConfigs]: readonly [T, DataAttributeConfigs[T]];
}[keyof DataAttributeConfigs];

export type DataAttributeConfig = DataAttributeDefinitionWithConfig[1];

export type DataAttributeType =
  | 'boolean'
  | 'date'
  | 'enum'
  | 'number'
  | 'reference'
  | 'string'
  | 'unknown';

type EnumValueConfig = string | LocalizedEnumValueConfig;
type LocalizedEnumValueConfig = { value: string; title: string };
type DataClassName = string;

function isDataAttributeType(
  attributeType: unknown
): attributeType is DataAttributeType {
  return (
    typeof attributeType === 'string' &&
    [
      'boolean',
      'date',
      'enum',
      'number',
      'reference',
      'string',
      'unknown',
    ].includes(attributeType)
  );
}

export function registerDataClassSchema(
  dataClassName: string,
  schema: LazyAsyncDataClassSchema
): void {
  const schemata = { ...schemataState.get() };
  schemata[dataClassName] = normalizeLazyAsync(schema);

  schemataState.set(schemata);
  invalidateSchemataCollection();
}

export function getDataAttributeDefinitions(
  dataClassName: string
): DataAttributeDefinitions | undefined {
  return schemataCollection.get(dataClassName).get()?.attributes;
}

export function getDataClassTitle(dataClassName: string): DataClassTitle {
  return schemataCollection.get(dataClassName).get()?.title;
}

export function getNormalizedDataAttributeDefinitions(
  dataClassName: string
): NormalizedDataAttributeDefinitions {
  return mapValues(
    getDataAttributeDefinitions(dataClassName),
    normalizeDataAttributeDefinition
  );
}

// For test purpose only
export function unregisterDataClassSchema(dataClassName: string): void {
  const schemata = { ...schemataState.get() };
  delete schemata[dataClassName];
  schemataState.set(schemata);
  invalidateSchemataCollection();
}

interface Schemata {
  [dataClassName: string]: DataClassSchemaCallback;
}

const schemataState = createStateContainer<Schemata>();
const counterState = createStateContainer<number>();

const schemataCollection = createLoadableCollection({
  name: 'dataClassSchema',
  loadElement: (dataClassName: string) => ({
    async loader() {
      const callback = schemataState.get()?.[dataClassName];

      if (callback) {
        const data = await callback();
        return {
          attributes:
            data.attributes instanceof Function
              ? await data.attributes()
              : await data.attributes,
          title:
            data.title instanceof Function
              ? await data.title()
              : await data.title,
        };
      }

      return { attributes: {} };
    },
    invalidation: () => getCounter().toString(),
  }),
});

function invalidateSchemataCollection() {
  counterState.set(getCounter() + 1);
}

function getCounter() {
  return counterState.get() || 0;
}

function normalizeDataAttributeDefinition(
  definition: DataAttributeDefinition
): NormalizedDataAttributeDefinition {
  if (typeof definition === 'string') return [definition, {}];

  const [type, config] = definition;
  if (type === 'enum') return [type, normalizeEnumValueConfig(config)];

  return [...definition];
}

function normalizeEnumValueConfig({ title, values }: EnumAttributeConfig) {
  const config: LocalizedEnumAttributeConfig = {
    values: values.map((value) =>
      typeof value === 'string' ? { value, title: value } : value
    ),
  };

  if (title) config.title = title;

  return config;
}

export function extractDataClassSchemaResponse(
  input: unknown
): DataClassSchemaResponse {
  const response: DataClassSchemaResponse = {
    attributes: {},
    title: undefined,
  };

  if (!isObject(input)) {
    logError(
      `Invalid schema response: expected an object: ${JSON.stringify(input)}`
    );

    return response;
  }

  if (!('attributes' in input)) {
    logError(
      `Invalid schema response: no "attributes" key: ${JSON.stringify(input)}`
    );

    return response;
  }

  if ('title' in input && typeof input.title === 'string') {
    response.title = input.title;
  }

  response.attributes = extractDataAttributeDefinitions(input.attributes);

  return response;
}

function extractDataAttributeDefinitions(
  input: unknown
): DataAttributeDefinitions {
  const attributes: DataAttributeDefinitions = {};

  if (!isObject(input)) {
    logError(
      `Invalid schema response: expected "attributes" to be an object: ${JSON.stringify(
        input
      )}`
    );

    return attributes;
  }

  Object.entries(input).forEach(([attributeName, maybeDefinition]) => {
    if (attributeName === '_id') {
      logSchemaError(
        attributeName,
        maybeDefinition,
        'Key "_id" is not allowed in schema attributes'
      );
    } else {
      if (typeof maybeDefinition === 'string') {
        if (isDataAttributeDefinitionWithOptionalConfig(maybeDefinition)) {
          attributes[attributeName] = maybeDefinition;
        } else {
          logSchemaError(
            attributeName,
            maybeDefinition,
            'Unknown attribute type.'
          );
        }
      } else if (Array.isArray(maybeDefinition)) {
        const definition = extractDefinitionWithConfig(
          attributeName,
          maybeDefinition
        );

        if (definition) {
          attributes[attributeName] = definition;
        }
      } else {
        logSchemaError(
          attributeName,
          maybeDefinition,
          'Expected an array or a string'
        );
      }
    }
  });

  return attributes;
}

function isDataAttributeDefinitionWithOptionalConfig(
  definition: unknown
): definition is DataAttributeDefinitionWithOptionalConfig {
  return (
    typeof definition === 'string' &&
    ['boolean', 'date', 'number', 'string'].includes(definition)
  );
}

function extractDefinitionWithConfig(
  attributeName: string,
  definition: unknown[]
): DataAttributeDefinitionWithConfig | undefined {
  if (definition.length < 2) {
    logSchemaError(
      attributeName,
      definition,
      'Expected an array with two elements.'
    );

    return;
  }

  const [attributeType, maybeConfig] = definition;

  if (!isDataAttributeType(attributeType)) {
    logSchemaError(attributeName, attributeType, 'Unknown attribute type.');
    return;
  }

  switch (attributeType) {
    case 'enum':
      return extractEnumDefinitionWithConfig(attributeName, maybeConfig);
    case 'reference':
      return extractReferenceDefinitionWithConfig(attributeName, maybeConfig);
    default:
      return extractLocalizedAttributeConfig(
        attributeName,
        attributeType,
        maybeConfig
      );
  }
}

function extractLocalizedAttributeConfig(
  attributeName: string,
  attributeType: Exclude<DataAttributeType, 'enum' | 'reference'>,
  maybeConfig: unknown
): DataAttributeDefinitionWithConfig | undefined {
  const config = isLocalizedAttributeConfig(maybeConfig)
    ? maybeConfig
    : undefined;

  if (config) return [attributeType, config];

  logSchemaError(attributeName, maybeConfig, 'Invalid localization.');
}

export function isEnumAttributeConfig(
  config: unknown
): config is EnumAttributeConfig {
  return (
    isObject(config) &&
    titleIsValidOrNotPresent(config) &&
    'values' in config &&
    Array.isArray(config.values) &&
    config.values.every(
      (valueOrConfig) =>
        (typeof valueOrConfig === 'string' && valueOrConfig.length) ||
        isLocalizedEnumValueConfig(valueOrConfig)
    )
  );
}

function extractEnumDefinitionWithConfig(
  attributeName: string,
  maybeConfig: unknown
): DataAttributeDefinitionWithConfig | undefined {
  if (isEnumAttributeConfig(maybeConfig)) {
    return ['enum', maybeConfig];
  }

  logSchemaError(
    attributeName,
    maybeConfig,
    'Invalid "enum" attribute config.'
  );
}

function extractReferenceDefinitionWithConfig(
  attributeName: string,
  maybeConfig: unknown
): DataAttributeDefinitionWithConfig | undefined {
  const config = isReferenceAttributeConfig(maybeConfig)
    ? maybeConfig
    : undefined;

  if (config) return ['reference', config];

  logSchemaError(
    attributeName,
    maybeConfig,
    'Invalid "reference" attribute config.'
  );
}

function isLocalizedEnumValueConfig(
  config: unknown
): config is LocalizedEnumValueConfig {
  return (
    isObject(config) &&
    'value' in config &&
    typeof config.value === 'string' &&
    !!config.value.length &&
    titleIsValidOrNotPresent(config)
  );
}

function isReferenceAttributeConfig(
  config: unknown
): config is ReferenceAttributeConfig {
  return (
    isObject(config) &&
    'to' in config &&
    typeof config.to === 'string' &&
    titleIsValidOrNotPresent(config) &&
    (!('reverseTitle' in config) || typeof config.reverseTitle === 'string')
  );
}

function isLocalizedAttributeConfig(
  config: unknown
): config is LocalizedAttributeConfig {
  return (
    isObject(config) &&
    (!Object.keys(config).length || titleIsValidOrNotPresent(config))
  );
}

function titleIsValidOrNotPresent(object: object) {
  return !('title' in object) || typeof object.title === 'string';
}

function logSchemaError(
  attributeName: string,
  actual: unknown,
  details?: string
) {
  logError(
    `Invalid schema definition for attribute "${attributeName}": ${JSON.stringify(
      actual
    )}${details ? `\nDetails: ${details}` : ''}`
  );
}
