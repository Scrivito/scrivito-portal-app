import { isExternalDataLoadingDisabled } from 'scrivito_sdk/data_integration/disable_external_data_loading';
import { shouldSkipOfflineHandlingFor } from 'scrivito_sdk/data_integration/external_data_class_config';
import {
  NormalExternalData,
  getViaDataConnection,
} from 'scrivito_sdk/data_integration/external_data_connection';
import { createLoadableCollection } from 'scrivito_sdk/loadable';
import { DataIdentifier } from 'scrivito_sdk/models';

export type ExternalData = Record<DataIdentifier, unknown>;

export function setExternalData(
  classIdentifier: string,
  dataId: string,
  data: NormalExternalData | null,
): void {
  loadableCollection.get([classIdentifier, dataId]).set(data);
}

export function getExternalData(
  classIdentifier: string,
  dataId: string,
): NormalExternalData | null | undefined {
  if (isExternalDataLoadingDisabled()) return undefined;

  return loadableCollection.get([classIdentifier, dataId]).get();
}

export type CollectionData = NormalExternalData | null;
export type CollectionKey = [string, string];

const loadableCollection = createLoadableCollection<
  CollectionData,
  CollectionKey
>({
  name: 'externaldata',
  loadElement: ([classIdentifier, dataId]) => ({
    loader: () => getViaDataConnection(classIdentifier, dataId),
    skipOfflineHandling: shouldSkipOfflineHandlingFor(classIdentifier),
  }),
});

export function findInExternalDataOfflineStore(
  selector: (data: CollectionData, key: CollectionKey) => boolean,
) {
  return loadableCollection.findValuesInOfflineStore(selector);
}
