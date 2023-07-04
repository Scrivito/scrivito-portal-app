import { ArgumentError } from 'scrivito_sdk/common';
import {
  checkCreateObjClass,
  checkCreateWidgetClass,
  checkProvideObjClass,
  checkProvideWidgetClass,
} from 'scrivito_sdk/realm/app_class_api_check';
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
import { registerClass } from './registry';

export type AppClass<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> = ObjClass<AttrDefs> | WidgetClass<AttrDefs>;

/** @public */
export function provideObjClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(name: string, definition: SimpleObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export function provideObjClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(name: string, definition: ObjClass<Attrs>): ObjClass<Attrs>;

/** @public */
export function provideObjClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(name: string, definition: ExtendObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export function provideObjClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions,
  ExtendAttrs extends AttributeDefinitions = AttributeDefinitions
>(
  name: string,
  definition: MixedObjClassDefinition<Attrs, ExtendAttrs>
): ObjClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

/** @internal */
export function provideObjClass(
  name: string,
  definition: ObjClassDefinition | ObjClass,
  ...excessArgs: never[]
): ObjClass {
  checkProvideObjClass(name, definition, ...excessArgs);
  const appClass = isAppClass(definition)
    ? definition
    : createAppObjClass({ ...definition, name });
  registerClass(name, appClass);

  return appClass;
}

/** @public */
export function provideWidgetClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(
  name: string,
  definition: SimpleWidgetClassDefinition<Attrs>
): WidgetClass<Attrs>;

/** @public */
export function provideWidgetClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(name: string, definition: WidgetClass<Attrs>): WidgetClass<Attrs>;

/** @public */
export function provideWidgetClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions
>(
  name: string,
  definition: ExtendWidgetClassDefinition<Attrs>
): WidgetClass<Attrs>;

/** @public */
export function provideWidgetClass<
  Attrs extends AttributeDefinitions = AttributeDefinitions,
  ExtendAttrs extends AttributeDefinitions = AttributeDefinitions
>(
  name: string,
  definition: MixedWidgetClassDefinition<Attrs, ExtendAttrs>
): WidgetClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

/** @internal */
export function provideWidgetClass(
  name: string,
  definition: WidgetClassDefinition | WidgetClass,
  ...excessArgs: never[]
): WidgetClass {
  checkProvideWidgetClass(name, definition, ...excessArgs);

  const appClass = isAppClass(definition)
    ? definition
    : createAppWidgetClass({ ...definition, name });
  registerClass(name, appClass);

  return appClass;
}

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
export function createObjClass(
  definition: ObjClassDefinition,
  ...excessArgs: never[]
): ObjClass {
  checkCreateObjClass(definition, ...excessArgs);

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
  definition: WidgetClassDefinition,
  ...excessArgs: never[]
): WidgetClass {
  checkCreateWidgetClass(definition, ...excessArgs);

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
  // compare: // https://stackoverflow.com/questions/5871040
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
