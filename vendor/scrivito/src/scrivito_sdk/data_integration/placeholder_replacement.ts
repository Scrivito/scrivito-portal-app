import {
  DATA_PLACEHOLDERS,
  SINGLE_DATA_PLACEHOLDER,
} from 'scrivito_sdk/common';
import { getDataClass } from 'scrivito_sdk/data_integration';
import { isDataIntegrationActive } from 'scrivito_sdk/data_integration/activate_data_integration';
import {
  DataContext,
  findItemElementInDataStackAndGlobalData,
  getDataContextValue,
} from 'scrivito_sdk/data_integration/data_context';
import type { DataStack } from 'scrivito_sdk/data_integration/data_stack';
import { loadableWithDefault } from 'scrivito_sdk/loadable';

export function isSinglePlaceholder(text: string): boolean {
  return !!text.match(SINGLE_DATA_PLACEHOLDER);
}

export function replacePlaceholdersWithData(
  text: string,
  {
    placeholders,
    dataStack,
    transform,
  }: {
    placeholders?: DataContext;
    dataStack?: DataStack;
    transform?: (rawValue: string) => string;
  } = {}
): string {
  if (!isDataIntegrationActive()) return text;

  return text.replace(DATA_PLACEHOLDERS, (placeholder, identifier) => {
    const rawValue = replacePlaceholder({
      identifier,
      placeholder,
      placeholders,
      dataStack,
    });

    return transform ? transform(rawValue) : rawValue;
  });
}

function replacePlaceholder({
  identifier,
  placeholder,
  placeholders,
  dataStack,
}: {
  identifier: string;
  placeholder: string;
  placeholders?: DataContext;
  dataStack?: DataStack;
}) {
  if (identifier.includes('.')) {
    const [dataClassName, attributeName] = identifier.split('.');

    return replaceQualifiedPlaceholder({
      dataClassName,
      attributeName,
      dataStack: dataStack || [],
    });
  }

  return replaceLegacyPlaceholder({ identifier, placeholder, placeholders });
}

function replaceQualifiedPlaceholder({
  dataClassName,
  attributeName,
  dataStack,
}: {
  dataClassName: string;
  attributeName: string;
  dataStack: DataStack;
}) {
  const dataItem = getDataItem(dataClassName, dataStack);
  if (dataItem === 'loading' || !dataItem) return '';

  const attributeValue = dataItem.getLocalized(attributeName);
  if (typeof attributeValue !== 'string') return '';

  return attributeValue;
}

function getDataItem(dataClassName: string, dataStack: DataStack) {
  return loadableWithDefault('loading', () => {
    const element = findItemElementInDataStackAndGlobalData(
      dataClassName,
      dataStack
    );

    if (element) return getDataClass(dataClassName)?.get(element._id);
  });
}

function replaceLegacyPlaceholder({
  identifier,
  placeholder,
  placeholders,
}: {
  identifier: string;
  placeholder: string;
  placeholders?: DataContext;
}) {
  const rawValue = getDataContextValue(identifier, placeholders || {});
  return rawValue === undefined ? placeholder : rawValue;
}
