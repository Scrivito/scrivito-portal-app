import { throwInvalidArgumentsError, underscore } from 'scrivito_sdk/common';
import {
  AttributeDefinitions,
  AttributeTypeToConfigMapping,
} from 'scrivito_sdk/realm/schema';

export function validateAttributeDefinitions(
  attributeDefinitions: AttributeDefinitions,
  apiFunctionName: string
) {
  Object.entries(attributeDefinitions).forEach(
    ([attributeName, definition]) => {
      assertCustomAttributeName(attributeName, apiFunctionName);

      const [attributeType, attributeTypeOptions] = definition;

      if (
        attributeType === 'widgetlist' &&
        typeof attributeTypeOptions !== 'string'
      ) {
        assertWidgetlistDefinition(
          attributeName,
          attributeTypeOptions,
          apiFunctionName
        );
      }

      if (
        (attributeType === 'enum' || attributeType === 'multienum') &&
        typeof attributeTypeOptions !== 'string'
      ) {
        assertEnumOrMultienumDefinition(
          attributeName,
          attributeTypeOptions,
          apiFunctionName
        );
      }
    }
  );
}

type WidgetlistOptions =
  | {
      only: string | readonly string[];
      maximum?: number;
    }
  | {
      only?: string | readonly string[];
      maximum: number;
    };

function assertWidgetlistDefinition(
  attributeName: string,
  options: WidgetlistOptions,
  apiFunctionName: string
) {
  if (options.maximum !== undefined) {
    const { maximum } = options;

    if (Number.isInteger(maximum) && maximum > 0) return;

    throwInvalidArgumentsError(
      apiFunctionName,
      `invalid value "${maximum}" supplied to ${attributeName}: The "maximum" must be a positive integer.`,
      { docPermalink: `js-sdk/${apiFunctionName}` }
    );
  }
}

function assertEnumOrMultienumDefinition(
  attributeName: string,
  {
    values,
  }:
    | AttributeTypeToConfigMapping['enum']
    | AttributeTypeToConfigMapping['multienum'],
  apiFunctionName: string
) {
  if (values.includes('')) {
    throwInvalidArgumentsError(
      apiFunctionName,
      `invalid "values" config supplied for ${attributeName}: An empty string is not a valid enum or multienum value.`,
      { docPermalink: `js-sdk/${apiFunctionName}` }
    );
  }
}

function assertCustomAttributeName(name: string, target: string) {
  if (isCustomAttributeName(name)) return;

  throwInvalidArgumentsError(
    target,
    `attribute name "${name}" is invalid. Must be a string (alphanumeric, starting with a lower-case character).`,
    { docPermalink: `js-sdk/${target}` }
  );
}

function isCustomAttributeName(name: string): boolean {
  return (
    /^[a-z](_+[A-Z0-9]|[A-Za-z0-9])*$/.test(name) &&
    underscore(name).length <= 50
  );
}
