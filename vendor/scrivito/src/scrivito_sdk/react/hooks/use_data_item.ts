import { DataItem } from 'scrivito_sdk/data_integration';
import { useData } from 'scrivito_sdk/react/hooks/use_data';

/** @public */
export function useDataItem(): DataItem | undefined {
  return useData().dataItem() || undefined;
}
