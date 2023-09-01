import {
  DataItem,
  dataItemFromPojo,
  isDataItemPojo,
} from 'scrivito_sdk/data_integration';
import { useLastDataStackElement } from 'scrivito_sdk/react/data_context_container';

/** @public */
export function useDataItem(): DataItem | undefined {
  const element = useLastDataStackElement();

  if (element && isDataItemPojo(element)) {
    return dataItemFromPojo(element);
  }
}
