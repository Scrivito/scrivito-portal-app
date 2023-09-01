import {
  ArgumentError,
  isCamelCase,
  isSystemAttribute,
} from 'scrivito_sdk/common';

export function assertValidAttributeName(attributeName: string): void {
  if (!isCamelCase(attributeName)) {
    throw new ArgumentError('Attribute names have to be in camel case.');
  }

  if (isSystemAttribute(attributeName)) {
    throw new ArgumentError(
      `Attribute name "${attributeName}" is not a valid custom attribute name.`
    );
  }
}
