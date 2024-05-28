import {
  DataContext,
  findItemElementInDataStackAndGlobalData,
  getDataContextValue,
} from 'scrivito_sdk/data_integration/data_context';
import type { DataStack } from 'scrivito_sdk/data_integration/data_stack';
import { getDataClass } from 'scrivito_sdk/data_integration/get_data_class';
import { loadableWithDefault } from 'scrivito_sdk/loadable';

const PLACEHOLDERS = /__([a-z](?:[a-z0-9]|\.[a-z]|(\._id)|_(?!_)){0,100})__/gi;
const SINGLE_PLACEHOLDER =
  /^__([a-z](?:[a-z0-9]|\.[a-z]|(\._id)|_(?!_)){0,100})__$/i;

export function isSinglePlaceholder(text: string): boolean {
  return !!text.match(SINGLE_PLACEHOLDER);
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
  return text.replace(PLACEHOLDERS, (placeholder, identifier) => {
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
      placeholder,
      dataStack: dataStack || [],
    });
  }

  return replaceLegacyPlaceholder({ identifier, placeholder, placeholders });
}

function replaceQualifiedPlaceholder({
  dataClassName,
  attributeName,
  placeholder,
  dataStack,
}: {
  dataClassName: string;
  attributeName: string;
  placeholder: string;
  dataStack: DataStack;
}) {
  const dataItem = getDataItem(dataClassName, dataStack);
  if (dataItem === 'loading') return '';
  if (!dataItem) return placeholder;

  const attributeValue = dataItem.get(attributeName);
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
