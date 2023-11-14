import {
  DataScope,
  dataScopeFromPojo,
  isDataScopePojo,
} from 'scrivito_sdk/data_integration';
import { useLastDataStackElement } from 'scrivito_sdk/react/data_context_container';

/** @beta */
export function useDataScope(): DataScope | undefined {
  const element = useLastDataStackElement();

  if (element && isDataScopePojo(element)) {
    return dataScopeFromPojo(element);
  }
}
