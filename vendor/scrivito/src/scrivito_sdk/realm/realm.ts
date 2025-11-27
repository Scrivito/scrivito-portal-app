import { ArgumentError } from 'scrivito_sdk/common';
import { validateAttributeDefinitions } from 'scrivito_sdk/realm/app_class_api_check';
import { Obj, ObjClass } from 'scrivito_sdk/realm/obj';
import {
  AttributeDefinitions,
  ExtendObjClassDefinition,
  ExtendWidgetClassDefinition,
  MixedObjClassDefinition,
  MixedWidgetClassDefinition,
  ObjClassDefinition,
  Schema,
  SimpleObjClassDefinition,
  SimpleWidgetClassDefinition,
  WidgetClassDefinition,
  isAppClass,
} from 'scrivito_sdk/realm/schema';
import { Widget, WidgetClass } from 'scrivito_sdk/realm/widget';
import {
  assertValidObjExtractTextAttributes,
  assertValidWidgetExtractTextAttributes,
} from './assert_valid_extract_text_attributes';
import { registerRealmClass } from './registry';

export type AppClass<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> = ObjClass<AttrDefs> | WidgetClass<AttrDefs>;

/** @public */
export function createObjClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(definition: SimpleObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export function createObjClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(definition: ExtendObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export function createObjClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions,
  ExtendAttrs extends AttributeDefinitions = AttributeDefinitions
>(
  definition: MixedObjClassDefinition<Attrs, ExtendAttrs>
): ObjClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

/** @internal */
export function createObjClass(definition: ObjClassDefinition): ObjClass {
  if (definition.attributes) {
    validateAttributeDefinitions(definition.attributes, 'createObjClass');
  }

  return createAppObjClass(definition);
}

/** @public */
export function createWidgetClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(definition: SimpleWidgetClassDefinition<Attrs>): WidgetClass<Attrs>;

/** @public */
export function createWidgetClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(definition: ExtendWidgetClassDefinition<Attrs>): WidgetClass<Attrs>;

/** @public */
export function createWidgetClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions,
  ExtendAttrs extends AttributeDefinitions = AttributeDefinitions
>(
  definition: MixedWidgetClassDefinition<Attrs, ExtendAttrs>
): WidgetClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

/** @internal */
export function createWidgetClass(
  definition: WidgetClassDefinition
): WidgetClass {
  if (definition.attributes) {
    validateAttributeDefinitions(definition.attributes, 'createWidgetClass');
  }

  return createAppWidgetClass(definition);
}

function createAppObjClass(definition: ObjClassDefinition): ObjClass {
  if (definition.extend && !isOrExtends(definition.extend, Obj)) {
    throw new ArgumentError(
      'Invalid value for "extend": not a Scrivito Obj class'
    );
  }

  if (definition.onlyInside && isBinary(definition)) {
    throw new ArgumentError(
      'onlyInside must not be specified for binary object classes.'
    );
  }

  if (definition.onlyChildren && isBinary(definition)) {
    throw new ArgumentError(
      'onlyChildren must not be specified for binary object classes.'
    );
  }

  if (definition.onlyAsRoot === true && definition.validAsRoot === false) {
    throw new ArgumentError(
      'validAsRoot must not be set to false for an object class permitted onlyAsRoot.'
    );
  }

  if (definition.onlyAsRoot && isBinary(definition)) {
    throw new ArgumentError(
      'onlyAsRoot must not be specified for binary object classes.'
    );
  }

  if (definition.validAsRoot && isBinary(definition)) {
    throw new ArgumentError(
      'validAsRoot must not be specified for binary object classes.'
    );
  }

  const baseClass: ObjClass = definition.extend || Obj;
  const schema = new Schema(definition, baseClass);
  assertValidObjExtractTextAttributes(schema);

  // we can only use the non-specific names `Obj` or `Widget` for AppClasses.
  // it's not possible to dynamically name a class in ES5 (or anything transpiled to ES5)
  // compare: see 6bcead77a18338d87faab618c8b9498f954f7f71 for a link to an explanation.
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return class Obj extends baseClass {
    static get _scrivitoPrivateSchema() {
      return schema;
    }
  };
}

function createAppWidgetClass(definition: WidgetClassDefinition): WidgetClass {
  if (definition.extend && !isOrExtends(definition.extend, Widget)) {
    throw new ArgumentError(
      'Invalid value for "extend": not a Scrivito Widget class'
    );
  }
  const baseClass: WidgetClass = definition.extend || Widget;
  const schema = new Schema(definition, baseClass);
  assertValidWidgetExtractTextAttributes(schema);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  return class Widget extends baseClass {
    static get _scrivitoPrivateSchema() {
      return schema;
    }
  };
}

type UnknownClass = new (...args: unknown[]) => unknown;

function isOrExtends(maybeClass: unknown, klass: UnknownClass): boolean {
  if (!maybeClass) return false;

  if (maybeClass === klass) return true;

  return (maybeClass as UnknownClass).prototype instanceof klass;
}

function isBinary(definition: ObjClassDefinition) {
  return definition.attributes?.blob === 'binary';
}

export function registerObjClass(
  name: string,
  objClassOrDefinition: ObjClassDefinition | ObjClass
) {
  validateAttrs(objClassOrDefinition);

  const objClass = isAppClass(objClassOrDefinition)
    ? objClassOrDefinition
    : createAppObjClass({ ...objClassOrDefinition, name });

  registerRealmClass(name, objClass);

  return objClass;
}

export function registerWidgetClass(
  name: string,
  widgetClassOrDefinition: WidgetClassDefinition | WidgetClass
) {
  validateAttrs(widgetClassOrDefinition);

  const widgetClass = isAppClass(widgetClassOrDefinition)
    ? widgetClassOrDefinition
    : createAppWidgetClass({ ...widgetClassOrDefinition, name });

  registerRealmClass(name, widgetClass);

  return widgetClass;
}

function validateAttrs(
  definition:
    | WidgetClassDefinition
    | ObjClassDefinition
    | WidgetClass
    | ObjClass
) {
  if ('extend' in definition && definition.extend) {
    if (!isAppClass(definition.extend)) {
      throw new ArgumentError(
        "Unexpected value for key 'extend'. It must be a valid ObjClass."
      );
    }
  }

  if (!isAppClass(definition) && definition.attributes) {
    validateAttributeDefinitions(definition.attributes, 'provideObjClass');
  }
}
