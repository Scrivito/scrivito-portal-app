import { isExternalDataLoadingDisabled } from 'scrivito_sdk/data_integration/disable_external_data_loading';
import {
  NormalExternalData,
  getViaDataConnection,
} from 'scrivito_sdk/data_integration/external_data_connection';
import { createLoadableCollection } from 'scrivito_sdk/loadable';
import { DataIdentifier } from 'scrivito_sdk/models';

export type ExternalData = Record<DataIdentifier, unknown>;

export function setExternalData(
  dataClass: string,
  dataId: string,
  data: NormalExternalData | null
): void {
  loadableCollection.get([dataClass, dataId]).set(data);
}

export function getExternalData(
  dataClass: string,
  dataId: string
): NormalExternalData | null | undefined {
  if (isExternalDataLoadingDisabled()) return undefined;

  return loadableCollection.get([dataClass, dataId]).get();
}

export type CollectionData = NormalExternalData | null;
export type CollectionKey = [string, string];

const loadableCollection = createLoadableCollection<
  CollectionData,
  CollectionKey
>({
  name: 'externaldata',
  loadElement: ([dataClass, dataId]) => ({
    loader: () => getViaDataConnection(dataClass, dataId),
  }),
});

export function findInExternalDataOfflineStore(
  selector: (data: CollectionData, key: CollectionKey) => boolean
) {
  return loadableCollection.findValuesInOfflineStore(selector);
}
