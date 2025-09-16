import escape from 'lodash-es/escape';

import { replaceInternalLinks } from 'scrivito_sdk/app_support/replace_internal_links';
import { replacePlaceholdersWithData } from 'scrivito_sdk/data_integration';
import { useDataContextContainer } from 'scrivito_sdk/react/data_context_container';

/** @public */
export function useResolvedHtmlValue(text: string): string {
  return useResolvedValue(text, escape);
}

/** @public */
export function useResolvedStringValue(text: string): string {
  return useResolvedValue(text);
}

function useResolvedValue(text: string, transform?: (text: string) => string) {
  const dataContextContainer = useDataContextContainer();
  const dataStack = dataContextContainer?.dataStack;
  const placeholders = dataContextContainer?.placeholders;

  return replaceInternalLinks(
    replacePlaceholdersWithData(text, {
      dataStack,
      placeholders,
      transform,
    }),
    { dataStack }
  );
}
