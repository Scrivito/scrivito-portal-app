import isObject from 'lodash-es/isObject';

import {
  ArgumentError,
  EmptyContinueIterable,
  transformContinueIterable,
} from 'scrivito_sdk/common';
import { DataQuery, IdBatchCollection, IdBatchQuery } from 'scrivito_sdk/data';
import {
  DataItemFilters,
  OrderSpec,
  PresentDataScopePojo,
} from 'scrivito_sdk/data_integration/data_class';
import { DataId, isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import { isExternalDataLoadingDisabled } from 'scrivito_sdk/data_integration/disable_external_data_loading';
import {
  getExternalData,
  setExternalData,
} from 'scrivito_sdk/data_integration/external_data';
import {
  IndexResult,
  ResultItem,
  ResultItemData,
  assertValidResultItem,
  autocorrectResultItemId,
  getExternalDataConnectionOrThrow,
} from 'scrivito_sdk/data_integration/external_data_connection';
import { IndexParams } from 'scrivito_sdk/data_integration/index_params';
import { load, loadableWithDefault } from 'scrivito_sdk/loadable';
import { StateContainer, createStateContainer } from 'scrivito_sdk/state';

const writeCounterStates: WriteCounterStates = {};
type WriteCounterStates = Record<string, StateContainer<number>>;

const batchCollection = new IdBatchCollection({
  recordedAs: 'externaldataquery',
  loadBatch,
  invalidation: ([dataClass]) =>
    loadableWithDefault(undefined, () =>
      getWriteCounter(dataClass).toString()
    ) || '',
});

export function getExternalDataQuery({
  _class: dataClass,
  filters,
  search,
  order,
}: PresentDataScopePojo): DataQuery<DataId> {
  if (isExternalDataLoadingDisabled()) return new EmptyContinueIterable();

  const idQuery = new IdBatchQuery((batchNumber) =>
    batchCollection.getBatch(
      [dataClass, filters, search, order],
      -1, // Dummy value for the batch size, since it's ignored anyways
      batchNumber
    )
  );

  return transformContinueIterable(idQuery, (iterator) =>
    iterator
      .map((idOrItem) => toDataResult(idOrItem, dataClass))
      .takeWhile(({ data }) => data !== undefined)
      .filter(({ data }) => data !== null)
      .map(({ id }) => id)
  );
}

export function notifyExternalDataWrite(dataClass: string): void {
  const counterState = getOrCreateWriteCounterState(dataClass);
  const counter = getWriteCounter(dataClass);

  counterState.set(counter + 1);
}

async function loadBatch(
  [dataClass, filters, search, order]: [
    string,
    DataItemFilters | undefined,
    string | undefined,
    OrderSpec | undefined
  ],
  continuation: string | undefined
) {
  const indexCallback = getIndexCallback(dataClass);

  const result = await indexCallback(
    new IndexParams(continuation, { filters, search, order })
  );

  assertValidIndexResult(result);

  const dataIds = handleResults(result.results, dataClass);

  return {
    continuation: result.continuation,
    results: dataIds,
  };
}

function assertValidIndexResult(result: unknown) {
  if (!isObject(result)) {
    throw new ArgumentError('An index result must be an object');
  }

  const { results, continuation } = result as IndexResult;

  if (!Array.isArray(results)) {
    throw new ArgumentError('Results of an index result must be an array');
  }

  if (continuation !== undefined) {
    if (typeof continuation !== 'string') {
      throw new ArgumentError(
        'Continuation of an index result must be a string or undefined'
      );
    }

    if (continuation.length === 0) {
      throw new ArgumentError(
        'Continuation of an index result must be a non-empty string or undefined'
      );
    }
  }
}

function handleResults(results: unknown[], dataClass: string) {
  return results.map((idOrItem) => {
    if (typeof idOrItem === 'string') {
      assertValidDataId(idOrItem);
      return handleDataId(dataClass, idOrItem);
    }

    assertValidResultItem(idOrItem);
    return handleResultItem(dataClass, idOrItem);
  });
}

function assertValidDataId(dataId: string): asserts dataId is DataId {
  if (!isValidDataId(dataId)) {
    throw new ArgumentError(
      'Strings in results of an index result must be valid data IDs'
    );
  }
}

function handleDataId(dataClass: string, dataId: string) {
  preloadExternalData(dataClass, dataId);
  return dataId;
}

function handleResultItem(dataClass: string, resultItem: ResultItem) {
  const { _id: id, ...data } = autocorrectResultItemId(resultItem);
  setExternalData(dataClass, id, data);

  return id;
}

function preloadExternalData(dataClass: string, id: string) {
  load(() => getExternalData(dataClass, id));
}

function getIndexCallback(dataClass: string) {
  const indexCallback = getExternalDataConnectionOrThrow(dataClass).index;

  if (!indexCallback) {
    throw new ArgumentError(
      `No index callback defined for data class "${dataClass}"`
    );
  }

  return indexCallback;
}

function getWriteCounter(dataClass: string) {
  const counterState = getOrCreateWriteCounterState(dataClass);
  const counter = counterState.get() || 0;

  return counter;
}

function getOrCreateWriteCounterState(dataClass: string) {
  let counterState = writeCounterStates[dataClass];

  if (!counterState) {
    counterState = createStateContainer<number>();
    writeCounterStates[dataClass] = counterState;
  }

  return counterState;
}

interface DataResult {
  id: string;
  data: ResultItemData | null | undefined;
}

function toDataResult(
  idOrItem: DataId | ResultItem,
  dataClass: string
): DataResult {
  if (typeof idOrItem === 'string') {
    return { id: idOrItem, data: getExternalData(dataClass, idOrItem) };
  }

  const { _id: id, ...data } = autocorrectResultItemId(idOrItem);
  return { id, data };
}
