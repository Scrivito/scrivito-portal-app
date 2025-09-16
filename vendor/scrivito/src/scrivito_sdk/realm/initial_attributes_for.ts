import { initialContentFor } from './initial_content_registry';
import { Schema } from './schema';
import { AttributeValue } from './wrap_in_app_class';

interface Attributes {
  [key: string]: AttributeValue | undefined;
}

export function initialAttributesFor(
  providedAttributes: object,
  schema: Schema,
  appClassName: string
): Attributes {
  const initialAttributes: Attributes = {};

  Object.keys(schema.attributes()).forEach((attributeName) => {
    if (
      !Object.prototype.hasOwnProperty.call(providedAttributes, attributeName)
    ) {
      const initialValue = initialContentFor(appClassName, attributeName);

      if (initialValue !== undefined) {
        initialAttributes[attributeName] = initialValue;
      }
    }
  });

  return initialAttributes;
}
