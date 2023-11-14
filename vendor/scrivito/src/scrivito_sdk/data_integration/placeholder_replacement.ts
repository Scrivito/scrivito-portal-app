import {
  DataContext,
  findItemInDataStackAndGlobalData,
  getDataContextValue,
} from 'scrivito_sdk/data_integration/data_context';
import { DataStack } from 'scrivito_sdk/data_integration/data_stack';
import { getDataClass } from 'scrivito_sdk/data_integration/get_data_class';

const PLACEHOLDERS = /__([a-z](?:[a-z0-9]|\.[a-z]|_(?!_)){0,100})__/gi;
const SINGLE_PLACEHOLDER = /^__([a-z](?:[a-z0-9]|\.[a-z]|_(?!_)){0,100})__$/i;

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
    const rawValue = replacePlaceholder(
      identifier,
      placeholder,
      placeholders,
      dataStack
    );

    return transform ? transform(rawValue) : rawValue;
  });
}

function replacePlaceholder(
  identifier: string,
  placeholder: string,
  placeholders?: DataContext,
  dataStack?: DataStack
) {
  if (identifier.includes('.')) {
    const [className, attributeName] = identifier.split('.');

    return replaceQualifiedPlaceholder(
      className,
      attributeName,
      placeholder,
      dataStack
    );
  }

  return replaceLegacyPlaceholder(identifier, placeholder, placeholders);
}

function replaceQualifiedPlaceholder(
  dataClassName: string,
  attributeName: string,
  placeholder: string,
  dataStack: DataStack = []
) {
  const itemElement = findItemInDataStackAndGlobalData(
    dataClassName,
    dataStack
  );
  if (!itemElement) return '';

  const dataClass = getDataClass(dataClassName);
  if (!dataClass) return placeholder;

  const dataItem = dataClass.get(itemElement._id);
  if (!dataItem) return '';

  const attributeValue = dataItem.get(attributeName);
  if (typeof attributeValue !== 'string') return placeholder;

  return attributeValue;
}

function replaceLegacyPlaceholder(
  identifier: string,
  placeholder: string,
  placeholders?: DataContext
) {
  const rawValue = getDataContextValue(identifier, placeholders || {});
  return rawValue === undefined ? placeholder : rawValue;
}
