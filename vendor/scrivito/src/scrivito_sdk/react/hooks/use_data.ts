import {
  DataItem,
  DataScope,
  EmptyDataScope,
  deserializeDataStackElement,
} from 'scrivito_sdk/data_integration';
import { useLastDataStackElement } from 'scrivito_sdk/react/data_context_container';

/** @public */
export function useData(): DataScope {
  const lastElement = useLastDataStackElement();
  if (!lastElement) return new EmptyDataScope();

  const scopeOrItem = deserializeDataStackElement(lastElement);
  if (!scopeOrItem) return new EmptyDataScope();

  if (scopeOrItem instanceof DataItem) {
    return scopeOrItem
      .dataClass()
      .all()
      .transform({ filters: { _id: scopeOrItem.id() } });
  }

  return scopeOrItem;
}
