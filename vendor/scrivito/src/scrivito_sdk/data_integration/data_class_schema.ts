import mapValues from 'lodash-es/mapValues';

import { LoadableCollection } from 'scrivito_sdk/loadable';
import { createStateContainer } from 'scrivito_sdk/state';

export type DataClassAttributes =
  | DataClassSchema
  | Promise<DataClassSchema>
  | DataSchemaCallback;

type DataSchemaCallback = () => Promise<DataClassSchema>;

export interface DataClassSchema {
  [attributeName: string]: DataAttributeDefinition;
}

export type DataAttributeDefinition =
  | Exclude<DataAttributeType, keyof DataAttributeConfigs>
  | DataAttributeDefinitionWithConfig;

export interface NormalizedDataClassSchema {
  [attributeName: string]: NormalizedDataAttributeDefinition;
}

export type NormalizedDataAttributeDefinition =
  | [Exclude<DataAttributeType, keyof DataAttributeConfigs>, {}]
  | DataAttributeDefinitionWithConfig;

export type DataAttributeConfigs = {
  enum: EnumAttributeConfig;
  reference: ReferenceAttributeConfig;
};

export interface EnumAttributeConfig {
  values: Array<EnumValueConfig>;
}

export interface ReferenceAttributeConfig {
  to: DataClassName;
}

export type DataAttributeDefinitionWithConfig = {
  [T in keyof DataAttributeConfigs]: readonly [T, DataAttributeConfigs[T]];
}[keyof DataAttributeConfigs];

export type DataAttributeConfig = DataAttributeDefinitionWithConfig[1];

export function registerDataClassSchema(
  dataClassName: string,
  attributes: DataClassAttributes
): void {
  const schemata = { ...schemataState.get() };
  schemata[dataClassName] = wrapInCallback(attributes);
  schemataState.set(schemata);
}

export function getDataClassSchema(dataClassName: string): DataClassSchema {
  return schemataCollection.get(dataClassName).getWithDefault({});
}

export function getNormalizedDataClassSchema(
  dataClassName: string
): NormalizedDataClassSchema {
  return mapValues(
    getDataClassSchema(dataClassName),
    normalizeDataAttributeDefinition
  );
}

// For test purpose only
export function unregisterDataClassSchema(dataClassName: string): void {
  const schemata = { ...schemataState.get() };
  delete schemata[dataClassName];
  schemataState.set(schemata);
}

export type DataAttributeType =
  | 'boolean'
  | 'date'
  | 'enum'
  | 'number'
  | 'reference'
  | 'string';

type EnumValueConfig = string;
type DataClassName = string;

interface Schemata {
  [dataClassName: string]: DataSchemaCallback;
}

const schemataState = createStateContainer<Schemata>();

const schemataCollection = new LoadableCollection({
  recordedAs: 'dataClassSchema',
  loadElement: (dataClassName: string) => ({
    loader() {
      const callback = schemataState.get()?.[dataClassName];
      return callback ? callback() : Promise.resolve({});
    },
  }),
});

function normalizeDataAttributeDefinition(
  definition: DataAttributeDefinition
): NormalizedDataAttributeDefinition {
  return typeof definition === 'string' ? [definition, {}] : definition;
}

function wrapInCallback(attributes: DataClassAttributes): DataSchemaCallback {
  if (attributes instanceof Function) return attributes;
  if (attributes instanceof Promise) return () => attributes;

  return () => Promise.resolve(attributes);
}
