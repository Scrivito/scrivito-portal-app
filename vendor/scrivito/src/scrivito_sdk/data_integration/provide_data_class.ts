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
import { LazyAsyncDataClassTitle } from 'scrivito_sdk/data_integration/data_class_schema';
import { mapLazyAsync } from 'scrivito_sdk/data_integration/lazy_async';
import { assertValidDataIdentifier } from 'scrivito_sdk/models';
import { getRealmClass } from 'scrivito_sdk/realm';
import { createRestApiSchema } from './create_rest_api_schema';

export type RestApi = string | ({ url: string } & ApiClientOptions);

type AsyncOrSync<Type> = Promise<Type> | Type;

type ProvideDataClassParams =
  | {
      restApi: AsyncOrSync<RestApi>;
      attributes?: LazyAsyncDataAttributeDefinitions;
      title?: LazyAsyncDataClassTitle;
    }
  | {
      connection: AsyncOrSync<Partial<UncheckedDataConnection>>;
      attributes?: LazyAsyncDataAttributeDefinitions;
      title?: LazyAsyncDataClassTitle;
    };

/** @public */
export function provideDataClass(
  name: string,
  params: AsyncOrSync<
    | {
        restApi: AsyncOrSync<RestApi>;
        attributes?: LazyAsyncDataAttributeDefinitions;
        title?: LazyAsyncDataClassTitle;
      }
    | {
        connection: AsyncOrSync<Partial<DataConnection>>;
        attributes?: LazyAsyncDataAttributeDefinitions;
        title?: LazyAsyncDataClassTitle;
      }
  >
): DataClass;

/** @internal */
export function provideDataClass(
  name: string,
  params: AsyncOrSync<{
    connection: AsyncOrSync<Partial<UncheckedDataConnection>>;
    attributes?: LazyAsyncDataAttributeDefinitions;
    title?: LazyAsyncDataClassTitle;
  }>
): DataClass;

/** @internal */
export function provideDataClass(
  name: string,
  params: AsyncOrSync<ProvideDataClassParams>
): DataClass {
  if (name === 'Obj') {
    throw new ArgumentError('"Obj" is not a valid data class name');
  }

  if (getRealmClass(name)) {
    throw new ArgumentError(`Class with name "${name}" already exists`);
  }

  assertValidDataIdentifier(name);
  registerExternalDataClass(name, mapLazyAsync(params, desugar)());

  return new ExternalDataClass(name);
}

async function desugar(params: ProvideDataClassParams) {
  if ('restApi' in params) {
    const apiClient = await createApiClient(Promise.resolve(params.restApi));

    return {
      connection: Promise.resolve(createRestApiConnectionForClass(apiClient)),
      ...createRestApiSchema(
        { attributes: params.attributes, title: params.title },
        apiClient
      ),
    };
  }

  return {
    connection: Promise.resolve(params.connection),
    schema: { attributes: params.attributes ?? {}, title: params.title },
  };
}

async function createApiClient(restApiPromise: Promise<RestApi>) {
  const restApi = await restApiPromise;

  return typeof restApi === 'string'
    ? createRestApiClient(restApi)
    : createRestApiClient(restApi.url, restApi);
}
