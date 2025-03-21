import { ArgumentError } from 'scrivito_sdk/common';
import { isExternalDataClassProvided } from 'scrivito_sdk/data_integration';
import {
  AttributeDefinitions,
  ExtendObjClassDefinition,
  ExtendWidgetClassDefinition,
  MixedObjClassDefinition,
  MixedWidgetClassDefinition,
  ObjClass,
  ObjClassDefinition,
  SimpleObjClassDefinition,
  SimpleWidgetClassDefinition,
  WidgetClass,
  WidgetClassDefinition,
  registerObjClass,
  registerWidgetClass,
} from 'scrivito_sdk/realm';

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
  definition: ObjClassDefinition | ObjClass
): ObjClass {
  if (name === 'Obj') {
    throw new ArgumentError('"Obj" is not a valid Obj class name');
  }

  if (isExternalDataClassProvided(name)) {
    throw new ArgumentError(`Class with name ${name} already exists`);
  }

  return registerObjClass(name, definition);
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
  definition: WidgetClassDefinition | WidgetClass
): WidgetClass {
  return registerWidgetClass(name, definition);
}
