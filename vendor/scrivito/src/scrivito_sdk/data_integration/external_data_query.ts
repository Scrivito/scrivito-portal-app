import {
  ArgumentError,
  EmptyContinueIterable,
  ScrivitoError,
  isValidInteger,
  transformContinueIterable,
} from 'scrivito_sdk/common';
import { DataQuery, IdBatchCollection, IdBatchQuery } from 'scrivito_sdk/data';
import {
  DEFAULT_LIMIT,
  DataScopeFilters,
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
  IndexResultCount,
  ResultItem,
  ResultItemData,
  assertValidIndexResultWithUnknownEntries,
  assertValidNumericId,
  assertValidResultItem,
  autocorrectResultItemId,
  getExternalDataConnectionOrThrow,
} from 'scrivito_sdk/data_integration/external_data_connection';
import { IndexParams } from 'scrivito_sdk/data_integration/index_params';
import { load, loadableWithDefault } from 'scrivito_sdk/loadable';
import { StateContainer, createStateContainer } from 'scrivito_sdk/state';

const writeCounterStates: WriteCounterStates = {};
type WriteCounterStates = Record<string, StateContainer<number>>;

// exported for test purposes only
export const batchCollection = new IdBatchCollection({
  recordedAs: 'externaldataquery',
  loadBatch,
  invalidation: ([dataClass]) =>
    loadableWithDefault(undefined, () =>
      getWriteCounter(dataClass).toString()
    ) || '',
});

export function countExternalData(
  dataClass: string,
  filters: DataScopeFilters | undefined,
  search: string | undefined
): number | null {
  return (
    batchCollection.getQueryCount([
      dataClass,
      filters,
      search,
      undefined,
      true,
    ]) ?? null
  );
}

export function getExternalDataQuery({
  _class: dataClass,
  filters,
  search,
  order,
  limit,
}: PresentDataScopePojo): DataQuery<DataId> {
  if (isExternalDataLoadingDisabled()) return new EmptyContinueIterable();

  const batchSize = limit ?? DEFAULT_LIMIT;

  const idQuery = new IdBatchQuery((batchNumber) =>
    batchCollection.getBatch(
      [
        dataClass,
        filters,
        search,
        order,
        false, // Never ask the backend about total count when fetching actual result data
      ],
      batchSize,
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

/** @public */
export class DataConnectionError extends ScrivitoError {
  constructor(readonly message: string) {
    super(message);
  }
}

async function loadBatch(
  [dataClass, filters, search, order, count]: [
    string,
    DataScopeFilters | undefined,
    string | undefined,
    OrderSpec | undefined,
    boolean | undefined
  ],
  continuation: string | undefined,
  batchSize: number
) {
  const indexCallback = getIndexCallback(dataClass);

  const result = await indexCallback(
    new IndexParams(continuation, {
      filters,
      search,
      order,
      limit: batchSize,
      count: !!count,
    })
  );

  if (result instanceof DataConnectionError) throw result;

  assertValidIndexResultWithUnknownEntries(result);

  const dataIds = handleResults(result.results, dataClass);

  return {
    continuation: result.continuation ?? undefined,
    results: dataIds,
    total: autocorrectAndValidateCount(result.count),
  };
}

function handleResults(results: unknown[], dataClass: string) {
  return results.map((idOrItem) => {
    if (typeof idOrItem === 'number') {
      assertValidNumericId(idOrItem);
      return handleDataId(dataClass, idOrItem.toString());
    }

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

function autocorrectAndValidateCount(
  resultCount: IndexResultCount | undefined
): number | undefined {
  if (resultCount === undefined || resultCount === null) return;

  const count = Number(resultCount);
  if (count >= 0 && isValidInteger(count)) return count;

  throw new ArgumentError(
    'Count of an index result must be a non-negative integer'
  );
}
