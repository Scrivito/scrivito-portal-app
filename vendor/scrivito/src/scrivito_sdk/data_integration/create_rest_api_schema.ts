import { ApiClient } from 'scrivito_sdk/client';
import { LazyAsyncDataAttributeDefinitions } from 'scrivito_sdk/data_integration';
import { LazyAsyncDataClassTitle } from 'scrivito_sdk/data_integration/data_class_schema';
import { fetchSchema } from 'scrivito_sdk/data_integration/fetch_schema';

export function createRestApiSchema(
  {
    attributes,
    title,
  }: {
    attributes?: LazyAsyncDataAttributeDefinitions;
    title?: LazyAsyncDataClassTitle;
  },
  apiClient: ApiClient
) {
  return {
    schema: {
      attributes:
        attributes || (async () => (await fetchSchema(apiClient)).attributes),
      title: title || (async () => (await fetchSchema(apiClient)).title),
    },
  };
}
