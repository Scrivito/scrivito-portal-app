import { ArgumentError } from 'scrivito_sdk/common';
import { AttributeDefinitions, Obj, Schema, Widget } from 'scrivito_sdk/realm';
import { AttributeTypeOf } from 'scrivito_sdk/realm/schema';
import {
  AttributeValueOf,
  unwrapAppAttributes,
  wrapInAppClass,
} from 'scrivito_sdk/realm/wrap_in_app_class';
import { getRealmClass } from './registry';

export function readAppAttribute<
  AttrDefs extends AttributeDefinitions,
  AttrName extends keyof AttrDefs & string
>(
  model: Obj | Widget,
  attributeName: AttrName
): AttributeValueOf<AttrDefs, AttrName> | null {
  const basicField = Schema.basicFieldFor<AttributeTypeOf<AttrDefs[AttrName]>>(
    model,
    attributeName
  );

  return basicField && wrapInAppClass(basicField.get());
}

export function updateAppAttributes(
  model: Obj | Widget,
  attributes: { [name: string]: unknown }
): void {
  const objClass = model.objClass();
  const appClass = getRealmClass(objClass);

  if (!appClass) {
    let baseClass;

    if (model.constructor === Obj) {
      baseClass = 'Obj';
    } else {
      baseClass = 'Widget';
    }

    throw new ArgumentError(
      `Updating is not supported on the base class "${baseClass}".`
    );
  }

  if (attributes.constructor !== Object) {
    throw new ArgumentError(
      'The provided attributes are invalid. They have ' +
        'to be an Object with valid Scrivito attribute values.'
    );
  }

  // Bang: truthy appClass implies that model is neither Obj nor Widget itself.
  // Every Subclass of Obj and Widget has a Schema.
  const schema = Schema.forInstance(model)!;
  const attributesWithTypeInfo = unwrapAppAttributes(
    attributes,
    schema,
    objClass
  );

  model._scrivitoPrivateContent.updateWithUnknownValues(attributesWithTypeInfo);
}
