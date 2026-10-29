import {
  DataItem,
  deserializeDataItem,
  findItemInGlobalData,
  isDataItemPojo,
  scopePojoToItemPojo,
} from 'scrivito_sdk/data_integration';
import { useClosestSingleItemElement } from 'scrivito_sdk/react/data_context_container';

/** @public */
export function useDataItem(dataClassName?: string): DataItem | undefined {
  const stackElement =
    useClosestSingleItemElement(dataClassName) ||
    (dataClassName && findItemInGlobalData(dataClassName));

  if (!stackElement) return;
  if (isDataItemPojo(stackElement)) return deserializeDataItem(stackElement);

  const itemPojo = scopePojoToItemPojo(stackElement);
  if (itemPojo) return deserializeDataItem(itemPojo);
}
