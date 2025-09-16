import mapValues from 'lodash-es/mapValues';

import {
  EmptyContinueIterable,
  transformContinueIterable,
} from 'scrivito_sdk/common';
import { DataQuery, IdBatchCollection, IdBatchQuery } from 'scrivito_sdk/data';
import { serializeDataAttribute } from 'scrivito_sdk/data_integration/attribute_serialization_and_deserialization';
import {
  DEFAULT_LIMIT,
  NormalizedDataScopeFilters,
  OrderSpec,
  PresentDataScopePojo,
  isOperatorSpec,
} from 'scrivito_sdk/data_integration/data_class';
import { DataAttributeDefinitions } from 'scrivito_sdk/data_integration/data_class_schema';
import { DataId } from 'scrivito_sdk/data_integration/data_id';
import { isExternalDataLoadingDisabled } from 'scrivito_sdk/data_integration/disable_external_data_loading';
import {
  getExternalData,
  setExternalData,
} from 'scrivito_sdk/data_integration/external_data';
import {
  NormalExternalData,
  indexViaDataConnection,
} from 'scrivito_sdk/data_integration/external_data_connection';
import { queryExternalDataOfflineStore } from 'scrivito_sdk/data_integration/external_data_offline_query';
import { DataConnectionIndexParams } from 'scrivito_sdk/data_integration/index_params';
import { load, loadableWithDefault } from 'scrivito_sdk/loadable';
import { StateContainer, createStateContainer } from 'scrivito_sdk/state';

const writeCounterStates: WriteCounterStates = {};
type WriteCounterStates = Record<string, StateContainer<number>>;

// exported for test purposes only
export const batchCollection = new IdBatchCollection({
  name: 'externaldataquery',
  loadBatch,
  loadOffline: queryExternalDataOfflineStore,
  invalidation: ([dataClass]) =>
    loadableWithDefault(undefined, () =>
      getWriteCounter(dataClass).toString()
    ) || '',
});

export function countExternalData(
  dataClass: string,
  filters: NormalizedDataScopeFilters | undefined,
  search: string | undefined,
  attributes: DataAttributeDefinitions
): number | null {
  validateFilters(dataClass, filters, attributes);

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

export function getExternalDataQuery(
  { _class: dataClass, filters, search, order, limit }: PresentDataScopePojo,
  attributes: DataAttributeDefinitions
): DataQuery<DataId> {
  if (isExternalDataLoadingDisabled()) return new EmptyContinueIterable();

  validateFilters(dataClass, filters, attributes);

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

function validateFilters(
  dataClassName: string,
  filters: NormalizedDataScopeFilters | undefined,
  attributes: DataAttributeDefinitions
) {
  mapValues(filters, (filterValue, filterName) => {
    const operatorSpecs = isOperatorSpec(filterValue)
      ? [filterValue]
      : filterValue.value;

    operatorSpecs.forEach((operatorSpec) => {
      const actualValue = isOperatorSpec(operatorSpec)
        ? operatorSpec.value
        : operatorSpec;
      serializeDataAttribute({
        dataClassName,
        attributeName: filterName,
        value: actualValue,
        attributes,
      });
    });
  });
}

export function notifyExternalDataWrite(dataClass: string): void {
  const counterState = getOrCreateWriteCounterState(dataClass);
  const counter = getWriteCounter(dataClass);

  counterState.set(counter + 1);
}

async function loadBatch(
  [dataClass, filters, search, order, count]: [
    string,
    NormalizedDataScopeFilters | undefined,
    string | undefined,
    OrderSpec | undefined,
    boolean | undefined
  ],
  continuation: string | undefined,
  batchSize: number
) {
  const result = await indexViaDataConnection(
    dataClass,
    new DataConnectionIndexParams(continuation, {
      filters,
      search,
      order,
      limit: batchSize,
      count: !!count,
    })
  );

  const dataIds = handleResults(result.results, dataClass);

  return {
    continuation: result.continuation ?? undefined,
    results: dataIds,
    total: result.count,
  };
}

function handleResults(
  results: Array<DataId | number | NormalExternalData>,
  dataClass: string
) {
  return results.map((idOrItem) => {
    if (typeof idOrItem === 'number') {
      return handleDataId(dataClass, idOrItem.toString());
    }

    if (typeof idOrItem === 'string') {
      return handleDataId(dataClass, idOrItem);
    }

    return handleResultItem(dataClass, idOrItem);
  });
}

function handleDataId(dataClass: string, dataId: string) {
  preloadExternalData(dataClass, dataId);
  return dataId;
}

function handleResultItem(dataClass: string, resultItem: NormalExternalData) {
  const id = resultItem.systemData._id;
  setExternalData(dataClass, id, resultItem);

  return id;
}

function preloadExternalData(dataClass: string, id: string) {
  load(() => getExternalData(dataClass, id));
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
  data: NormalExternalData | null | undefined;
}

function toDataResult(
  idOrItem: DataId | NormalExternalData,
  dataClass: string
): DataResult {
  if (typeof idOrItem === 'string') {
    return { id: idOrItem, data: getExternalData(dataClass, idOrItem) };
  }

  return { id: idOrItem.systemData._id, data: idOrItem };
}
