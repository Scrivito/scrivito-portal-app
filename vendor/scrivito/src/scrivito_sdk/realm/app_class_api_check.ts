import { throwInvalidArgumentsError, underscore } from 'scrivito_sdk/common';
import { AttributeDefinitions } from 'scrivito_sdk/realm/schema';

export function validateAttributeDefinitions(
  attributeDefinitions: AttributeDefinitions,
  target: string
) {
  Object.entries(attributeDefinitions).forEach(([name, definition]) => {
    assertCustomAttributeName(name, target);

    const [attributeType, attributeTypeOptions] = definition;

    if (
      attributeType === 'widgetlist' &&
      typeof attributeTypeOptions !== 'string'
    ) {
      assertWidgetlistDefinition(name, attributeTypeOptions, target);
    }
  });
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
  name: string,
  options: WidgetlistOptions,
  target: string
) {
  if (options.maximum !== undefined) {
    const { maximum } = options;

    if (Number.isInteger(maximum) && maximum > 0) return;

    throwInvalidArgumentsError(
      target,
      `invalid value "${maximum}" supplied to ${name}: The "maximum" must be a positive integer.`,
      { docPermalink: `'js-sdk/${target}'` }
    );
  }
}

function assertCustomAttributeName(name: string, target: string) {
  if (isCustomAttributeName(name)) return;

  throwInvalidArgumentsError(
    target,
    `attribute name "${name}" is invalid. Must be a string (alphanumeric, starting with a lower-case character).`,
    { docPermalink: `'js-sdk/${target}'` }
  );
}

function isCustomAttributeName(name: string): boolean {
  return (
    /^[a-z](_+[A-Z0-9]|[A-Za-z0-9])*$/.test(name) &&
    underscore(name).length <= 50
  );
}
