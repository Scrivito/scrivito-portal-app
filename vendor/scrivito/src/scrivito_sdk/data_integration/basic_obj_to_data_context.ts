import type { DataContext } from 'scrivito_sdk/data_integration/data_context';
import type { BasicObj } from 'scrivito_sdk/models';
import { schemaFromBasicObjOrWidget } from 'scrivito_sdk/realm';

export function basicObjToDataContext(obj: BasicObj): DataContext {
  return {
    _class: obj.objClass(),
    _id: obj.id(),
    ...allCustomAttributesOfTypeString(obj),
  };
}

interface StringAttributes {
  [attributeName: string]: string;
}

export function allCustomAttributesOfTypeString(
  obj: BasicObj
): StringAttributes | undefined {
  const schema = schemaFromBasicObjOrWidget(obj);
  if (!schema) return;

  const attributes = schema.attributes();
  const stringAttributes: StringAttributes = {};

  Object.keys(attributes).forEach((attributeName) => {
    const [attributeType] = attributes[attributeName];

    if (attributeType === 'string') {
      const attributeValue = obj.get(attributeName, 'string');
      stringAttributes[attributeName] = attributeValue;
    }
  });

  return stringAttributes;
}
