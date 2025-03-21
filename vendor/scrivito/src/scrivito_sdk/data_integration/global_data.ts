import { getDataClassOrThrow } from 'scrivito_sdk/data_integration';
import {
  DataItemPojo,
  DataScopePojo,
  itemPojoToScopePojo,
} from 'scrivito_sdk/data_integration/data_class';
import { ExternalDataItem } from 'scrivito_sdk/data_integration/external_data_class';
import { createStateContainer } from 'scrivito_sdk/state';

const globalContextState = createStateContainer<Record<string, string>>();

export function provideGlobalData(dataItem: ExternalDataItem): void {
  const dataClassName = dataItem.dataClassName();
  const dataItemId = dataItem.id();

  globalContextState.set({
    ...globalContextState.get(),
    [dataClassName]: dataItemId,
  });
}

export function getGlobalDataItems(): ExternalDataItem[] {
  const globalContext = globalContextState.get();

  return globalContext
    ? Object.entries(globalContext)
        .map(([dataClassName, dataId]) =>
          getDataClassOrThrow(dataClassName).get(dataId)
        )
        .filter(
          (maybeDataItem): maybeDataItem is ExternalDataItem => !!maybeDataItem
        )
    : [];
}

export function getDefaultItemIdForDataClass(
  dataClassName: string
): string | null {
  return globalContextState.get()?.[dataClassName] || null;
}

export function findItemInGlobalData(
  dataClassName: string
): DataItemPojo | undefined {
  const defaultItemId = getDefaultItemIdForDataClass(dataClassName);

  if (defaultItemId) {
    return {
      _class: dataClassName,
      _id: defaultItemId,
    };
  }
}

export function findScopeInGlobalData(
  dataClassName: string
): DataScopePojo | undefined {
  const itemPojo = findItemInGlobalData(dataClassName);
  if (itemPojo) return itemPojoToScopePojo(itemPojo);
}
