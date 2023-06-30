import {
  DataContext,
  findMatchingItemElement,
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
    dataContext,
    dataStack,
    transform,
  }: {
    dataContext?: DataContext;
    dataStack?: DataStack;
    transform?: (rawValue: string) => string;
  } = {}
): string {
  return text.replace(PLACEHOLDERS, (placeholder, identifier) => {
    if (identifier.includes('.')) {
      const [className, attributeName] = identifier.split('.');

      return replaceQualifiedPlaceholder(
        className,
        attributeName,
        placeholder,
        dataStack
      );
    }

    const rawValue = getDataContextValue(identifier, dataContext || {});
    if (rawValue === undefined) return placeholder;

    return transform ? transform(rawValue) : rawValue;
  });
}

function replaceQualifiedPlaceholder(
  dataClassName: string,
  attributeName: string,
  placeholder: string,
  dataStack: DataStack = []
) {
  const itemElement = findMatchingItemElement(dataClassName, dataStack);
  if (!itemElement) return '';

  const dataClass = getDataClass(dataClassName);
  if (!dataClass) return placeholder;

  const dataItem = dataClass.get(itemElement._id);
  if (!dataItem) return '';

  const attributeValue = dataItem.get(attributeName);
  if (typeof attributeValue !== 'string') return placeholder;

  return attributeValue;
}
