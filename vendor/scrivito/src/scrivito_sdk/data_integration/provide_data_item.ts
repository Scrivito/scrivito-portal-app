import { ApiClient, createRestApiClient } from 'scrivito_sdk/client';
import {
  DataItem,
  ExternalDataClass,
  ExternalDataItemConnection,
  LazyAsyncDataAttributeDefinitions,
  LazyAsyncDataClassTitle,
  SINGLETON_DATA_ID,
  provideExternalDataItem,
} from 'scrivito_sdk/data_integration';
import { createRestApiSchema } from 'scrivito_sdk/data_integration/create_rest_api_schema';
import { mapLazyAsync } from 'scrivito_sdk/data_integration/lazy_async';
import { RestApi } from 'scrivito_sdk/data_integration/provide_data_class';
import { assertValidDataIdentifier } from 'scrivito_sdk/models';

type AsyncOrSync<Type> = Promise<Type> | Type;

type CommonProvideDataItemParams = {
  attributes?: LazyAsyncDataAttributeDefinitions;
  title?: LazyAsyncDataClassTitle;
};

type ProvideDataItemParams =
  | ({
      restApi: AsyncOrSync<RestApi>;
    } & CommonProvideDataItemParams)
  | ({
      connection: AsyncOrSync<ExternalDataItemConnection>;
    } & CommonProvideDataItemParams);

/** @public */
export function provideDataItem(
  name: string,
  get: ExternalDataItemConnection['get']
): DataItem;

/** @public */
export function provideDataItem(
  name: string,
  params: AsyncOrSync<ProvideDataItemParams>
): DataItem;

/** @public */
export function provideDataItem(
  name: string,
  connection: AsyncOrSync<ExternalDataItemConnection>
): DataItem;

/** @internal */
export function provideDataItem(
  name: string,
  params:
    | AsyncOrSync<ProvideDataItemParams | ExternalDataItemConnection>
    | ExternalDataItemConnection['get']
): DataItem {
  assertValidDataIdentifier(name);

  const dataClass = new ExternalDataClass(name);

  provideExternalDataItem(
    dataClass,
    mapLazyAsync(Promise.resolve(params), desugar)()
  );

  return dataClass.getUnchecked(SINGLETON_DATA_ID);
}

async function desugar(
  params:
    | ProvideDataItemParams
    | ExternalDataItemConnection
    | ExternalDataItemConnection['get']
) {
  if (typeof params === 'function') {
    return { connection: { get: params }, schema: { attributes: {} } };
  }

  if ('restApi' in params) {
    const apiClient = await createApiClient(Promise.resolve(params.restApi));

    return {
      connection: createRestApiConnectionForItem(apiClient),
      schema: createRestApiSchema(
        { attributes: params.attributes, title: params.title },
        apiClient
      ),
    };
  }

  if ('connection' in params) {
    return {
      connection: params.connection,
      schema: { attributes: params.attributes ?? {}, title: params.title },
    };
  }

  return {
    connection: params,
    schema: { attributes: {} },
  };
}

async function createApiClient(restApiPromise: Promise<RestApi>) {
  const restApi = await restApiPromise;

  return typeof restApi === 'string'
    ? createRestApiClient(restApi)
    : createRestApiClient(restApi.url, restApi);
}

function createRestApiConnectionForItem(
  apiClient: ApiClient
): ExternalDataItemConnection {
  return {
    get: async () => apiClient.fetch(''),
    update: async (data) => apiClient.fetch('', { method: 'patch', data }),
  };
}
