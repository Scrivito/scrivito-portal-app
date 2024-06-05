import { DataScope, applyDataLocator } from 'scrivito_sdk/data_integration';
import { DataLocator } from 'scrivito_sdk/models';
import { useDataStack } from 'scrivito_sdk/react/data_context_container';

/** @public */
export function useDataLocator(
  dataLocator: DataLocator | null | undefined
): DataScope {
  const dataStack = useDataStack() || [];
  return applyDataLocator(dataStack, dataLocator);
}
