import { DataScope, deserializeDataScope } from 'scrivito_sdk/data_integration';
import { useClosestMultiItemElement } from 'scrivito_sdk/react/data_context_container';

/** @public */
export function useDataScope(dataClassName?: string): DataScope | undefined {
  const stackElement = useClosestMultiItemElement(dataClassName);
  if (stackElement) return deserializeDataScope(stackElement);
}
