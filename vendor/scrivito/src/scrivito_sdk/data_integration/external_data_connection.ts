import isObject from 'lodash-es/isObject';

import { ArgumentError, ScrivitoError } from 'scrivito_sdk/common';
import { DataId, isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import { ExternalData } from 'scrivito_sdk/data_integration/external_data';
import { IndexParams } from 'scrivito_sdk/data_integration/index_params';
import { createStateContainer } from 'scrivito_sdk/state';

/** @public */
export interface DataConnection {
  index?: IndexCallback;
  get: GetCallback;
  create?: CreateCallback;
  update?: UpdateCallback;
  delete?: DeleteCallback;
}

/** @public */
export type IndexCallback = (params: IndexParams) => Promise<IndexResult>;
/** @public */
export type GetCallback = (id: string) => Promise<unknown | null>;
/** @public */
export type CreateCallback = (data: ExternalData) => Promise<ResultItem>;

/** @public */
export type UpdateCallback = (
  id: string,
  data: ExternalData
) => Promise<unknown>;

/** @public */
export type DeleteCallback = (id: string) => Promise<unknown>;

/** @public */
export interface IndexResult {
  results: Array<DataId | ResultItem>;
  continuation?: string;
}

/** @public */
export type ResultItem = ResultItemConvenienceId | ResultItemWithId;

interface ResultItemConvenienceId extends ResultItemData {
  _id?: undefined;
  id: DataId;
}

interface ResultItemWithId extends ResultItemData {
  _id: DataId;
}

export interface ResultItemData {
  [key: string]: unknown;
}

export function assertValidResultItem(
  resultItem: unknown
): asserts resultItem is ResultItem {
  if (!isObject(resultItem)) {
    throw new ArgumentError('A result item must be an object');
  }

  const { _id: id } = autocorrectResultItemId(resultItem as ResultItem);

  if (!isValidDataId(id)) {
    throw new ArgumentError(
      '"id" key of a result object must contain a valid data ID'
    );
  }
}

export function autocorrectResultItemId(
  resultItem: ResultItem
): ResultItemWithId {
  if (isResultItemWithId(resultItem)) return resultItem;

  const { id, ...rest } = resultItem;
  return { _id: id, ...rest };
}

function isResultItemWithId(
  resultItem: ResultItem
): resultItem is ResultItemWithId {
  return typeof resultItem._id === 'string';
}

const connectionsState = createStateContainer<Record<string, DataConnection>>();

export function setExternalDataConnection(
  name: string,
  connection: DataConnection
): void {
  connectionsState.set({
    ...connectionsState.get(),
    [name]: connection,
  });
}

export function getExternalDataConnection(
  name: string
): DataConnection | undefined {
  const connections = connectionsState.get();
  if (connections) return connections[name];
}

export function getExternalDataConnectionNames(): string[] {
  const connections = connectionsState.get();
  return connections ? Object.keys(connections) : [];
}

export function getExternalDataConnectionOrThrow(name: string): DataConnection {
  const connection = getExternalDataConnection(name);

  if (!connection) {
    throw new ScrivitoError(`Missing data class with name ${name}`);
  }

  return connection;
}
