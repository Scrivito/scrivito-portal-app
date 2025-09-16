import { isObject } from 'scrivito_sdk/common';

import { registerExternalDataClass } from 'scrivito_sdk/data_integration';
import { throwMissingCallbackError } from 'scrivito_sdk/data_integration/add_missing_data_connection_handlers';
import { LazyAsyncDataClassSchema } from 'scrivito_sdk/data_integration/data_class_schema';
import { ExternalData } from 'scrivito_sdk/data_integration/external_data';
import { ExternalDataClass } from 'scrivito_sdk/data_integration/external_data_class';
import { UncheckedDataConnection } from 'scrivito_sdk/data_integration/external_data_connection';
import { filterExternalDataItem } from 'scrivito_sdk/data_integration/filter_external_data_item';
import { provideGlobalData } from 'scrivito_sdk/data_integration/global_data';
import {
  LazyAsync,
  mapLazyAsync,
  normalizeLazyAsync,
} from 'scrivito_sdk/data_integration/lazy_async';
import { registerSingletonDataClass } from 'scrivito_sdk/data_integration/singleton_data_classes';
import { load } from 'scrivito_sdk/loadable';

export const SINGLETON_DATA_ID = '0';

type ExternalDataItemGetCallback = () => Promise<unknown>;

type ExternalDataItemUpdateCallback = (data: ExternalData) => Promise<unknown>;

export type ExternalDataItemConnection = {
  get: ExternalDataItemGetCallback;
  update?: ExternalDataItemUpdateCallback;
};

type LazyAsyncExternalDataItemConnection =
  LazyAsync<ExternalDataItemConnection>;

export function provideExternalDataItem(
  dataClass: ExternalDataClass,
  params: Promise<{
    connection: LazyAsyncExternalDataItemConnection;
    schema: LazyAsyncDataClassSchema;
  }>
): void {
  const name = dataClass.name();

  registerExternalDataClass(
    name,
    mapLazyAsync(params, ({ connection, schema }) => ({
      connection: desugarConnection(connection, dataClass),
      schema,
    }))()
  );

  registerSingletonDataClass(name);
  provideGlobalData(dataClass.getUnchecked(SINGLETON_DATA_ID));
}

function isSingletonDataId(id: string) {
  return id === SINGLETON_DATA_ID;
}

function desugarConnection(
  connection: LazyAsyncExternalDataItemConnection,
  dataClass: ExternalDataClass
) {
  const getCallback = async () =>
    (await normalizeLazyAsync(connection)()).get();

  const updateCallback = async (data: ExternalData) => {
    const { update } = await normalizeLazyAsync(connection)();

    if (update) return update(data);
    throwMissingCallbackError('update', dataClass.name())();
  };

  const dataConnection: Partial<UncheckedDataConnection> = {
    get: async (id) => {
      if (isSingletonDataId(id)) {
        return ignoreDataId(await getCallback());
      }

      return null;
    },

    index: async (params) => {
      const dataItem = await load(() => dataClass.get(SINGLETON_DATA_ID));
      if (!dataItem) return { results: [] };

      return filterExternalDataItem(dataItem, params.filters());
    },

    ...(updateCallback && {
      update: async (id, data) =>
        isSingletonDataId(id) ? updateCallback(data) : null,
    }),
  };

  return dataConnection;
}

function ignoreDataId(data: unknown) {
  if (isObject(data) && '_id' in data) {
    const { _id, ...rest } = data;
    return rest;
  }

  return data;
}
