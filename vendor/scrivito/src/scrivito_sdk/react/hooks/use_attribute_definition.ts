import { NormalizedDataAttributeDefinition } from 'scrivito_sdk/data_integration';
import { useData } from 'scrivito_sdk/react/hooks/use_data';

type EmptyDataAttributeDefinition = [undefined, object];

/** @public */
export function useAttributeDefinition():
  | NormalizedDataAttributeDefinition
  | EmptyDataAttributeDefinition {
  const scope = useData();
  const attributeName = scope.attributeName();

  return (
    (attributeName !== null &&
      scope.dataClass()?.attributeDefinitions()[attributeName]) || [
      undefined,
      {},
    ]
  );
}
