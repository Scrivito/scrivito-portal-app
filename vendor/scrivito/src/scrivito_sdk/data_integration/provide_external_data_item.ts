import { ArgumentError } from 'scrivito_sdk/common';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import { ExternalData } from 'scrivito_sdk/data_integration/external_data';
import { ExternalDataClass } from 'scrivito_sdk/data_integration/external_data_class';
import { setExternalDataConnection } from 'scrivito_sdk/data_integration/external_data_connection';
import { provideGlobalData } from 'scrivito_sdk/data_integration/global_data';
import { IndexParams } from 'scrivito_sdk/data_integration/index_params';
import { load } from 'scrivito_sdk/loadable';

export type ExternalDataItemReadCallback = () => Promise<ExternalData>;

const SINGLE_ID = '0';

export function provideExternalDataItem(
  name: string,
  read: ExternalDataItemReadCallback
): DataItem {
  const dataClass = new ExternalDataClass(name);

  setExternalDataConnection(name, {
    get: async (id: string) => readItem(id, read),
    index: async (params: IndexParams) => readAndFilterItem(params, dataClass),
  });

  const dataItem = dataClass.getUnchecked(SINGLE_ID);
  provideGlobalData(dataItem);

  return dataItem;
}

async function readItem(id: string, read: ExternalDataItemReadCallback) {
  return id === SINGLE_ID ? read() : null;
}

async function readAndFilterItem(
  params: IndexParams,
  dataClass: ExternalDataClass
) {
  const dataItem = await load(() => dataClass.get(SINGLE_ID));
  if (!dataItem) return { results: [] };

  const filters = params.filters();
  const doesMatch = Object.keys(filters).every((attributeName) =>
    consideredEqual(dataItem.get(attributeName), filters[attributeName])
  );

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
