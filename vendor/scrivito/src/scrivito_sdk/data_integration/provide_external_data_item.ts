import { ArgumentError } from 'scrivito_sdk/common';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import { ExternalDataClass } from 'scrivito_sdk/data_integration/external_data_class';
import { setExternalDataConnection } from 'scrivito_sdk/data_integration/external_data_connection';
import { provideGlobalData } from 'scrivito_sdk/data_integration/global_data';
import { IndexParams } from 'scrivito_sdk/data_integration/index_params';
import { load } from 'scrivito_sdk/loadable';

import { ExternalData } from './external_data';

type ExternalDataItemGetCallback = () => Promise<unknown>;

type ExternalDataItemUpdateCallback = (data: ExternalData) => Promise<unknown>;

export type ExternalDataItemConnection = {
  get: ExternalDataItemGetCallback;
  update?: ExternalDataItemUpdateCallback;
};

const SINGLE_ID = '0';

export function provideExternalDataItem(
  name: string,
  connection: ExternalDataItemConnection
): DataItem {
  const dataClass = new ExternalDataClass(name);

  const updateCallback = connection.update;

  setExternalDataConnection(name, {
    get: async (id) => (isIdValid(id) ? connection.get() : null),
    index: async (params: IndexParams) => readAndFilterItem(params, dataClass),
    ...(updateCallback && {
      update: async (id, data) => (isIdValid(id) ? updateCallback(data) : null),
    }),
  });

  const dataItem = dataClass.getUnchecked(SINGLE_ID);
  provideGlobalData(dataItem);

  return dataItem;
}

function isIdValid(id: string) {
  return id === SINGLE_ID;
}

async function readAndFilterItem(
  params: IndexParams,
  dataClass: ExternalDataClass
) {
  const dataItem = await load(() => dataClass.get(SINGLE_ID));
  if (!dataItem) return { results: [] };

  const filters = params.filters();
  const doesMatch = Object.keys(filters).every((attributeName) => {
    return (
      attributeName === '_id' ||
      consideredEqual(dataItem.get(attributeName), filters[attributeName])
    );
  });

  return { results: doesMatch ? [SINGLE_ID] : [] };
}

function consideredEqual(itemValue: unknown, filterValue: string) {
  if (itemValue === undefined || itemValue === null) return false;
  if (typeof itemValue === 'string') return itemValue === filterValue;

  if (Array.isArray(itemValue)) {
    return itemValue.some((element) => element === filterValue);
  }

  throw new ArgumentError(`Cannot filter on ${typeof itemValue}`);
}
