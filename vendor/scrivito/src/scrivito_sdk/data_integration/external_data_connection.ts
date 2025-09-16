import { ClientError } from 'scrivito_sdk/client';
import {
  ArgumentError,
  isObject,
  isPresent,
  isValidInteger,
} from 'scrivito_sdk/common';
import { anticipatedDataConnection } from 'scrivito_sdk/data_integration/anticipated_data_connection';
import { DataConnectionError } from 'scrivito_sdk/data_integration/data_connection_error';
import { DataId, isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import { ExternalData } from 'scrivito_sdk/data_integration/external_data';
import { DataConnectionIndexParams } from 'scrivito_sdk/data_integration/index_params';
import { LazyAsync } from 'scrivito_sdk/data_integration/lazy_async';
import { isValidDataIdentifier } from 'scrivito_sdk/models';
import { createStateContainer } from 'scrivito_sdk/state';

/** @public */
export interface DataConnection {
  index: IndexCallback;
  get: GetCallback;
  create: CreateCallback;
  update: UpdateCallback;
  delete: DeleteCallback;
}

/** @internal */
export interface UncheckedDataConnection {
  index: UncheckedIndexCallback;
  create: UncheckedCreateCallback;
  get: GetCallback;
  update: UpdateCallback;
  delete: DeleteCallback;
}

/** @public */
export type IndexCallback = (
  params: DataConnectionIndexParams
) => Promise<IndexResult | DataConnectionError>;

/** @internal */
type UncheckedIndexCallback = (
  params: DataConnectionIndexParams
) => Promise<unknown>;

/** @public */
export type GetCallback = (id: string) => Promise<unknown | null>;

/** @public */
export type CreateCallback = (
  data: ExternalData
) => Promise<DataConnectionResultItem>;

type UncheckedCreateCallback = (data: ExternalData) => Promise<unknown>;

/** @public */
export type UpdateCallback = (
  id: string,
  data: ExternalData
) => Promise<unknown>;

/** @public */
export type DeleteCallback = (id: string) => Promise<unknown>;

/** @public */
export interface IndexResult {
  results: Array<DataId | number | DataConnectionResultItem>;
  continuation?: string | null;
  count?: IndexResultCount;
}

export interface NormalIndexResult {
  results: Array<DataId | number | NormalExternalData>;
  continuation?: string | null;
  count?: number;
}

export interface NormalExternalData {
  systemData: ExternalSystemAttributes;
  customData: ExternalCustomAttributes;
}

export interface ExternalSystemAttributes {
  _id: string;
}

export type ExternalCustomAttributes = Record<string, unknown>;

type IndexResultCount = number | string | null;

/** @public */
export type DataConnectionResultItem =
  | ResultItemNumericConvenienceId
  | ResultItemNumericId
  | ResultItemConvenienceId
  | ResultItemStringId;

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

export interface ResultItemStringId extends ResultItemData {
  _id: DataId;
}

export interface ResultItemData {
  [key: string]: unknown;
}

function assertValidNumericId(id: number) {
  if (id < 0 || !Number.isSafeInteger(id)) {
    throw new ArgumentError(
      `Numeric IDs must be a non-negative "safe" integer: ${id.toString()}`
    );
  }
}

function parseResultItem(resultItem: unknown): NormalExternalData {
  if (!isObject(resultItem)) {
    throw new ArgumentError('A result item must be an object');
  }

  if ('_id' in resultItem) {
    const { _id, ...customData } = resultItem;
    return parseToExternalData(_id, customData);
  }

  if ('id' in resultItem) {
    const { id, ...customData } = resultItem;
    return parseToExternalData(id, customData);
  }

  throw new ArgumentError('"_id" key missing');
}

function parseToExternalData(id: unknown, customData: object) {
  return {
    systemData: { _id: parseId(id) },
    customData: filterValidDataIdentifiers(customData),
  };
}

function parseId(id: unknown) {
  if (typeof id === 'number') {
    assertValidNumericId(id);
    return id.toString();
  }

  if (!isValidDataId(id)) {
    throw new ArgumentError('"_id" key invalid (must be numeric or hex)');
  }

  return id;
}

function parseIndexResult(result: unknown): NormalIndexResult {
  if (!isObject(result)) {
    throw new ArgumentError('An index result must be an object');
  }

  const { results: inputResults, continuation, count } = result as IndexResult;

  if (!Array.isArray(inputResults)) {
    throw new ArgumentError('Results of an index result must be an array');
  }

  const parsedResults = inputResults.map((idOrItem) => {
    if (typeof idOrItem === 'number') {
      assertValidNumericId(idOrItem);
      return idOrItem;
    } else if (typeof idOrItem === 'string') {
      assertValidDataId(idOrItem);
      return idOrItem;
    }

    return parseResultItem(idOrItem);
  });

  if (typeof continuation === 'string') {
    if (continuation.length === 0) {
      throw new ArgumentError(
        'Continuation of an index result must be a non-empty string, null or undefined'
      );
    }
  } else if (isPresent(continuation)) {
    throw new ArgumentError(
      'Continuation of an index result must be a string, null or undefined'
    );
  }

  return {
    results: parsedResults,
    continuation,
    count: parseCount(count),
  };
}

function parseCount(
  resultCount: IndexResultCount | undefined
): number | undefined {
  if (resultCount === undefined || resultCount === null) return;

  if (typeof resultCount !== 'number' && typeof resultCount !== 'string') {
    throw new ArgumentError(
      'Count of an index result must be a non-negative integer, null or undefined'
    );
  }

  const count = Number(resultCount);
  if (count >= 0 && isValidInteger(count)) return count;

  throw new ArgumentError(
    'Count of an index result must be a non-negative integer'
  );
}

function assertValidDataId(dataId: string): asserts dataId is DataId {
  if (!isValidDataId(dataId)) {
    throw new ArgumentError(
      'Strings in results of an index result must be valid data IDs'
    );
  }
}

const connectionsState =
  createStateContainer<Record<string, UncheckedDataConnection>>();

// for test purposes only
export function resetExternalDataConnections(): void {
  connectionsState.clear();
}

export function setExternalDataConnection(
  name: string,
  partialConnection: LazyAsync<Partial<UncheckedDataConnection>>
): void {
  const connection = anticipatedDataConnection(partialConnection, name);

  connectionsState.set({
    ...connectionsState.get(),
    [name]: connection,
  });
}

export function hasExternalDataConnection(name: string): boolean {
  return !!getExternalDataConnection(name);
}

function getExternalDataConnection(
  name: string
): UncheckedDataConnection | undefined {
  const connections = connectionsState.get();
  if (connections) return connections[name];
}

export function getExternalDataConnectionNames(): string[] {
  const connections = connectionsState.get();
  return connections ? Object.keys(connections) : [];
}

function getExternalDataConnectionOrThrow(
  name: string
): UncheckedDataConnection {
  const connection = getExternalDataConnection(name);

  if (!connection) {
    throw new ArgumentError(`Missing data class with name ${name}`);
  }

  return connection;
}

export async function getViaDataConnection(
  name: string,
  id: string
): Promise<NormalExternalData | null> {
  if (!isValidDataId(id)) {
    throw new ArgumentError(`Invalid data ID "${id}"`);
  }

  let response;

  try {
    response = await getExternalDataConnectionOrThrow(name).get(id);
  } catch (error) {
    if (error instanceof ClientError && error.httpStatus === 404) {
      return null;
    }

    throw error;
  }

  if (response === null) return null;

  if (!isObject(response)) {
    throw new ArgumentError('External data must be an object or null');
  }

  return {
    systemData: { _id: id },
    customData: filterValidDataIdentifiers(response),
  };
}

function filterValidDataIdentifiers(data: object) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => isValidDataIdentifier(key))
  );
}

export async function indexViaDataConnection(
  name: string,
  params: DataConnectionIndexParams
): Promise<NormalIndexResult> {
  const result = await getExternalDataConnectionOrThrow(name).index(params);

  if (result instanceof DataConnectionError) throw result;

  return parseIndexResult(result);
}

export async function createViaDataConnection(
  name: string,
  data: ExternalData
): Promise<NormalExternalData> {
  const response = await getExternalDataConnectionOrThrow(name).create(data);

  const { systemData, customData } = parseResultItem(response);

  return {
    systemData,
    customData: Object.keys(customData).length === 0 ? data : customData,
  };
}

export async function updateViaDataConnection(
  name: string,
  id: string,
  data: ExternalData
): Promise<ExternalData> {
  const response = await getExternalDataConnectionOrThrow(name).update(
    id,
    data
  );

  const updatedData = response ?? {};

  if (!isObject(updatedData)) {
    throw new ArgumentError('External data must be an object or null');
  }

  const { _id, ...filteredData } = filterValidDataIdentifiers(updatedData);

  return { ...data, ...filteredData };
}

export function deleteViaDataConnection(
  name: string,
  id: string
): Promise<unknown> {
  return getExternalDataConnectionOrThrow(name).delete(id);
}
