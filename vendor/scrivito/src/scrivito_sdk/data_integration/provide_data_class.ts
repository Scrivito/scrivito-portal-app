import { ApiClientOptions, createRestApiClient } from 'scrivito_sdk/client';
import { ArgumentError } from 'scrivito_sdk/common';
import {
  DataClass,
  DataConnection,
  ExternalDataClass,
  LazyAsyncDataAttributeDefinitions,
  UncheckedDataConnection,
  createRestApiConnectionForClass,
  registerExternalDataClass,
} from 'scrivito_sdk/data_integration';
import { createRestApiSchema } from 'scrivito_sdk/data_integration/create_rest_api_schema';
import { LazyAsyncDataClassTitle } from 'scrivito_sdk/data_integration/data_class_schema';
import { mapLazyAsync } from 'scrivito_sdk/data_integration/lazy_async';
import { assertValidDataIdentifier } from 'scrivito_sdk/models';
import { getRealmClass } from 'scrivito_sdk/realm';

export type RestApi = string | ({ url: string } & ApiClientOptions);

type AsyncOrSync<Type> = Promise<Type> | Type;

export type FuncOrAsyncOrSync<Type> =
  | (() => AsyncOrSync<Type>)
  | AsyncOrSync<Type>;

interface CommonProvideDataClassParams {
  attributes?: LazyAsyncDataAttributeDefinitions;
  title?: LazyAsyncDataClassTitle;
  refetchOnWindowFocus?: false;
}

type ProvideDataClassParamsWithRestApi = {
  restApi: AsyncOrSync<RestApi>;
} & CommonProvideDataClassParams;

type ProvideDataClassParamsWithUncheckedConnection = {
  connection: AsyncOrSync<Partial<UncheckedDataConnection>>;
} & CommonProvideDataClassParams;

type ProvideDataClassParams =
  | ProvideDataClassParamsWithRestApi
  | ProvideDataClassParamsWithUncheckedConnection;

/** @public */
export function provideDataClass(
  name: string,
  params: FuncOrAsyncOrSync<
    | ProvideDataClassParamsWithRestApi
    | ({
        connection: AsyncOrSync<Partial<DataConnection>>;
      } & CommonProvideDataClassParams)
  >
): DataClass;

/** @internal */
export function provideDataClass(
  name: string,
  params: FuncOrAsyncOrSync<ProvideDataClassParamsWithUncheckedConnection>
): DataClass;

/** @internal */
export function provideDataClass(
  name: string,
  params: FuncOrAsyncOrSync<ProvideDataClassParams>
): DataClass {
  if (name === 'Obj') {
    throw new ArgumentError('"Obj" is not a valid data class name');
  }

  if (getRealmClass(name)) {
    throw new ArgumentError(`Class with name "${name}" already exists`);
  }

  assertValidDataIdentifier(name);
  registerExternalDataClass(name, mapLazyAsync(params, desugar));

  return new ExternalDataClass(name);
}

async function desugar(params: ProvideDataClassParams) {
  if ('restApi' in params) {
    const apiClient = await createApiClient(Promise.resolve(params.restApi));

    return {
      connection: Promise.resolve(createRestApiConnectionForClass(apiClient)),
      schema: createRestApiSchema(
        { attributes: params.attributes, title: params.title },
        apiClient
      ),
      refetchOnWindowFocus: params.refetchOnWindowFocus,
    };
  }

  return {
    connection: Promise.resolve(params.connection),
    schema: { attributes: params.attributes ?? {}, title: params.title },
    refetchOnWindowFocus: params.refetchOnWindowFocus,
  };
}

async function createApiClient(restApiPromise: Promise<RestApi>) {
  const restApi = await restApiPromise;

  return typeof restApi === 'string'
    ? createRestApiClient(restApi)
    : createRestApiClient(restApi.url, restApi);
}
