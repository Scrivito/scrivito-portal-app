import { ArgumentError } from 'scrivito_sdk/common';
import {
  AppClass,
  AttributeDefinitions,
  Obj,
  Schema,
  Widget,
} from 'scrivito_sdk/realm';
import { AttributeTypeOf } from 'scrivito_sdk/realm/schema';
import {
  AttributeValueOf,
  unwrapAppAttributes,
  wrapInAppClass,
} from 'scrivito_sdk/realm/wrap_in_app_class';
import { objClassNameFor } from './registry';

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
  const appClassName = objClassNameFor(model.constructor as AppClass);

  if (!appClassName) {
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

  // Bang: truthy appClassName implies that model is neither Obj nor Widget itself.
  // Every Subclass of Obj and Widget has a Schema.
  const schema = Schema.forInstance(model)!;
  const attributesWithTypeInfo = unwrapAppAttributes(
    attributes,
    schema,
    appClassName
  );

  model._scrivitoPrivateContent.updateWithUnknownValues(attributesWithTypeInfo);
}
