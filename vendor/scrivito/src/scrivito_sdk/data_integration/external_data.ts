import { isObject } from 'underscore';

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

export type ExternalData = Record<DataIdentifier, unknown>;

export function setExternalData(
  dataClass: string,
  dataId: string,
  data: unknown
): void {
  assertExternalData(data, dataClass);
  loadableCollection.get([dataClass, dataId]).set(data);
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

      assertExternalData(unknownValue, dataClass);

      return unknownValue;
    },
  }),
});

function assertExternalData(
  data: unknown,
  dataClass: string
): asserts data is ExternalData {
  if (data === null) return;

  if (!isObject(data)) {
    throw new ArgumentError(
      `"GetCallback" of the connection of the data class ${dataClass} returned neither an object nor null`
    );
  }

  Object.keys(data as Object).forEach((key) => {
    if (!isValidDataIdentifier(key)) {
      throw new ArgumentError(`Invalid data identifier ${key}`);
    }
  });
}
