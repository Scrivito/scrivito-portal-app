import { UrlForOptions, urlFor } from 'scrivito_sdk/app_support/url_for';
import { DataStack, getDataContextQuery } from 'scrivito_sdk/data_integration';
import { BasicLink, BasicObj, Binary } from 'scrivito_sdk/models';
import { useDataStack } from 'scrivito_sdk/react/data_context_container';
import { Link, Obj, unwrapAppClass } from 'scrivito_sdk/realm';

/** @beta */
export function useUrlFor(
  target: Binary | Link | Obj,
  options?: UrlForOptions
): string {
  const dataStack = useDataStack();

  const query = addDataContextQueryTo(
    options?.query,
    dataStack,
    unwrapAppClass(target)
  );

  return urlFor(target, { ...options, query });
}

function addDataContextQueryTo(
  givenQuery: string | undefined,
  dataStack: DataStack | undefined,
  target: Binary | BasicLink | BasicObj
) {
  if (target instanceof Binary || !dataStack) return givenQuery;
  return getDataContextQuery(unwrapAppClass(target), dataStack, givenQuery);
}
