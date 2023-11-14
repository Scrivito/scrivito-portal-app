import isObject from 'lodash-es/isObject';

import { ClientError } from 'scrivito_sdk/client';
import { ArgumentError } from 'scrivito_sdk/common';
import { isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import {
  DataIdentifier,
  isValidDataIdentifier,
} from 'scrivito_sdk/data_integration/data_identifier';
import { isExternalDataLoadingDisabled } from 'scrivito_sdk/data_integration/disable_external_data_loading';
import { getExternalDataConnectionOrThrow } from 'scrivito_sdk/data_integration/external_data_connection';
import { LoadableCollection } from 'scrivito_sdk/loadable';

/** @public */
export type ExternalData = Record<DataIdentifier, unknown>;

export function setExternalData(
  dataClass: string,
  dataId: string,
  data: unknown
): void {
  loadableCollection.get([dataClass, dataId]).set(handleExternalData(data));
}

export function getExternalData(
  dataClass: string,
  dataId: string
): ExternalData | null | undefined {
  if (isExternalDataLoadingDisabled()) return undefined;
  return loadableCollection.get([dataClass, dataId]).get();
}

const loadableCollection = new LoadableCollection<
  ExternalData | null,
  [string, string]
>({
  loadElement: ([dataClass, dataId]) => ({
    loader: async () => {
      if (!isValidDataId(dataId)) {
        throw new ArgumentError(`Invalid data ID "${dataId}"`);
      }

      const connection = getExternalDataConnectionOrThrow(dataClass);
      let unknownValue;

      try {
        unknownValue = await connection.get(dataId);
      } catch (error) {
        if (error instanceof ClientError && error.code === '404') return null;

        throw error;
      }

      return handleExternalData(unknownValue);
    },
  }),
});

function handleExternalData(data: unknown) {
  if (data === null) return null;
  if (isExternalData(data)) return filterValidDataIdentifiers(data);

  throw new ArgumentError('External data must be an object or null');
}

function isExternalData(data: unknown): data is ExternalData {
  return isObject(data) && typeof data !== 'function' && !Array.isArray(data);
}

function filterValidDataIdentifiers(data: ExternalData) {
  const filteredData: ExternalData = {};

  Object.entries(data).forEach(([key, value]) => {
    if (isValidDataIdentifier(key)) filteredData[key] = value;
  });

  return filteredData;
}
