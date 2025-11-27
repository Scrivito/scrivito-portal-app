import { ApiClient } from 'scrivito_sdk/client';
import { LazyAsyncDataAttributeDefinitions } from 'scrivito_sdk/data_integration';
import {
  DataClassSchema,
  LazyAsyncDataClassTitle,
} from 'scrivito_sdk/data_integration/data_class_schema';
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
): DataClassSchema {
  const fetchAttributes = async () => (await fetchSchema(apiClient)).attributes;
  const fetchTitle = async () => (await fetchSchema(apiClient)).title;

  return {
    attributes: attributes || fetchAttributes,
    title: attributes ? title : title || fetchTitle,
  };
}
