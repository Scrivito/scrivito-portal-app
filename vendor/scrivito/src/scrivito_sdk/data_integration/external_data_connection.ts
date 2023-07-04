import { isEmpty, isObject } from 'underscore';

import { ArgumentError, ScrivitoError } from 'scrivito_sdk/common';
import { assertValidDataItemAttributes } from 'scrivito_sdk/data_integration/data_class';
import { DataId, isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import { ExternalData } from 'scrivito_sdk/data_integration/external_data';
import { IndexParams } from 'scrivito_sdk/data_integration/index_params';
import { createStateContainer } from 'scrivito_sdk/state';

/** @public */
export interface ReadOnlyDataConnection {
  index?: IndexCallback;
  get: GetCallback;
}

/** @public */
export type IndexCallback = (params: IndexParams) => Promise<IndexResult>;
/** @public */
export type GetCallback = (id: string) => Promise<unknown | null>;

/** @beta */
export interface ReadWriteDataConnection extends ReadOnlyDataConnection {
  create?: CreateCallback;
  update?: UpdateCallback;
  delete?: DeleteCallback;
}

/** @beta */
export type CreateCallback = (data: ExternalData) => Promise<ResultItem>;
/** @beta */
export type UpdateCallback = (id: string, data: ExternalData) => Promise<void>;
/** @beta */
export type DeleteCallback = (id: string) => Promise<void>;

/** @public */
export interface IndexResult {
  results: Array<DataId | ResultItem>;
  continuation?: string;
}

/** @public */
export interface ResultItem extends ResultItemData {
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

  const { _id: id, ...data } = resultItem as ResultItem;

  if (!isValidDataId(id)) {
    throw new ArgumentError(
      '"id" key of a result object must contain a valid data ID'
    );
  }

  if (!isEmpty(data)) assertValidDataItemAttributes(data);
}

const connectionsState =
  createStateContainer<Record<string, ReadWriteDataConnection>>();

export function setExternalDataConnection(
  name: string,
  connection: ReadWriteDataConnection
): void {
  connectionsState.set({
    ...connectionsState.get(),
    [name]: connection,
  });
}

export function getExternalDataConnection(
  name: string
): ReadWriteDataConnection | undefined {
  const connections = connectionsState.get();
  if (connections) return connections[name];
}

export function getExternalDataConnectionNames(): string[] {
  const connections = connectionsState.get();
  return connections ? Object.keys(connections) : [];
}

export function getExternalDataConnectionOrThrow(
  name: string
): ReadWriteDataConnection {
  const connection = getExternalDataConnection(name);

  if (!connection) {
    throw new ScrivitoError(`Missing data class with name ${name}`);
  }

  return connection;
}
