import memoize from 'lodash-es/memoize';

import { ApiClient, ClientError } from 'scrivito_sdk/client';
import { logError } from 'scrivito_sdk/common';
import { extractDataClassSchemaResponse } from 'scrivito_sdk/data_integration';
import { currentLanguage } from 'scrivito_sdk/data_integration/current_language';
import { DataClassSchemaResponse } from 'scrivito_sdk/data_integration/data_class_schema';
import { load } from 'scrivito_sdk/loadable';

export const fetchSchema = memoize(async function (
  apiClient: ApiClient
): Promise<DataClassSchemaResponse> {
  const siteLanguage = await load(currentLanguage);
  let response: unknown;

  try {
    response = await apiClient.fetch('schema', {
      headers: siteLanguage ? { 'Accept-Language': siteLanguage } : {},
    });
  } catch (error) {
    if (error instanceof ClientError) {
      logError(
        'Error while fetching schema (using empty schema)',
        error.message,
        JSON.stringify(error.details)
      );

      return { attributes: {} };
    }

    throw error;
  }

  return extractDataClassSchemaResponse(response);
});
