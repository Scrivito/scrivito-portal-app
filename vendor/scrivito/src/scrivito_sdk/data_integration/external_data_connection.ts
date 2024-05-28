import isObject from 'lodash-es/isObject';

import { ArgumentError } from 'scrivito_sdk/common';
import { DataId, isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import { ExternalData } from 'scrivito_sdk/data_integration/external_data';
import { DataConnectionError } from 'scrivito_sdk/data_integration/external_data_query';
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
export type IndexCallback = (
  params: IndexParams
) => Promise<IndexResult | DataConnectionError>;

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
export interface IndexResult extends IndexResultWithUnknownEntries {
  results: Array<DataId | number | ResultItem>;
}

interface IndexResultWithUnknownEntries {
  results: unknown[];
  continuation?: string | null;
  count?: IndexResultCount;
}

export type IndexResultCount = number | string | null;

/** @public */
export type ResultItem =
  | ResultItemNumericConvenienceId
  | ResultItemNumericId
  | ResultItemConvenienceId
  | ResultItemId;

interface ResultItemNumericConvenienceId extends ResultItemData {
  _id?: undefined;
  id: number;
}

interface ResultItemNumericId extends ResultItemData {
  _id: number;
}

interface ResultItemConvenienceId extends ResultItemData {
  _id?: undefined;
  id: DataId;
}

interface ResultItemId extends ResultItemData {
  _id: DataId;
}

export interface ResultItemData {
  [key: string]: unknown;
}

export function assertValidNumericId(id: number) {
  if (id < 0 || !Number.isSafeInteger(id)) {
    throw new ArgumentError(
      `Numeric IDs must be a non-negative "safe" integer: ${id.toString()}`
    );
  }
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
      '"_id" key missing or invalid (must be numeric or hex)'
    );
  }
}

export function assertValidIndexResultWithUnknownEntries(
  result: unknown
): asserts result is IndexResultWithUnknownEntries {
  if (!isObject(result)) {
    throw new ArgumentError('An index result must be an object');
  }

  const { results, continuation, count } = result as IndexResult;

  if (!Array.isArray(results)) {
    throw new ArgumentError('Results of an index result must be an array');
  }

  if (typeof continuation === 'string') {
    if (continuation.length === 0) {
      throw new ArgumentError(
        'Continuation of an index result must be a non-empty string, null or undefined'
      );
    }
  } else if (continuation !== null && continuation !== undefined) {
    throw new ArgumentError(
      'Continuation of an index result must be a string, null or undefined'
    );
  }

  if (
    typeof count !== 'number' &&
    typeof count !== 'string' &&
    count !== null &&
    count !== undefined
  ) {
    throw new ArgumentError(
      'Count of an index result must be a non-negative integer, null or undefined'
    );
  }
}

export function autocorrectResultItemId(resultItem: ResultItem): ResultItemId {
  if (isResultItemWithId(resultItem)) return resultItem;

  if (isResultItemWithNumericId(resultItem)) {
    const { _id, ...rest } = resultItem;
    assertValidNumericId(_id);
    return { _id: _id.toString(), ...rest };
  }

  if (isResultItemConvenienceNumericId(resultItem)) {
    const { id, ...rest } = resultItem;
    assertValidNumericId(id);
    return { _id: id.toString(), ...rest };
  }

  const { id, ...rest } = resultItem;
  return { _id: id, ...rest };
}

function isResultItemWithId(
  resultItem: ResultItem
): resultItem is ResultItemId {
  return typeof resultItem._id === 'string';
}

function isResultItemWithNumericId(
  resultItem: ResultItem
): resultItem is ResultItemNumericId {
  return typeof resultItem._id === 'number';
}

function isResultItemConvenienceNumericId(
  resultItem: ResultItem
): resultItem is ResultItemNumericConvenienceId {
  return typeof resultItem.id === 'number';
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
    throw new ArgumentError(`Missing data class with name ${name}`);
  }

  return connection;
}
