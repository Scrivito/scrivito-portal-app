import mapValues from 'lodash-es/mapValues';

import { ArgumentError, isSystemAttribute } from 'scrivito_sdk/common';
import {
  AttributeType,
  BasicAttributeValue,
  BasicLink,
  BasicObj,
  BasicObjSearch,
  BasicTypeInfo,
  BasicWidget,
  Binary,
  DataLocator,
  ObjUnavailable,
} from 'scrivito_sdk/models';
import { NormalizedBasicAttributesWithUnknownValues } from 'scrivito_sdk/models/basic_attribute_content';
import {
  AttributeDefinitions,
  Link,
  Obj,
  ObjClass,
  ObjSearch,
  Schema,
  Widget,
  WidgetClass,
} from 'scrivito_sdk/realm';
import { objClassFor, widgetClassFor } from './registry';
import { AttributeTypeOf } from './schema';

type BasicValue<T> = T extends Obj
  ? BasicObj
  : T extends Widget
  ? BasicWidget
  : T extends Link
  ? BasicLink
  : T extends ObjSearch
  ? BasicObjSearch
  : T;

type Value = Obj | Widget | Link | ObjSearch;

type BasicValueToAttributeValue<T> = T extends BasicObj[]
  ? Obj[]
  : T extends BasicWidget[]
  ? Widget[]
  : T extends BasicLink[]
  ? Link[]
  : T extends Array<BasicObj | ObjUnavailable>
  ? Obj[]
  : T extends BasicObj
  ? Obj
  : T extends BasicWidget
  ? Widget
  : T extends BasicLink
  ? Link | null
  : T extends ObjUnavailable
  ? null
  : T extends Binary
  ? Binary
  : T;

interface AttributeMapping {
  binary: Binary | null;
  boolean: boolean;
  datalocator: DataLocator;
  date: Date | null;
  datetime: Date | null;
  enum: string | null;
  float: number | null;
  integer: number | null;
  html: string;
  link: Link | null;
  linklist: Link[];
  multienum: string[];
  reference: Obj | null;
  referencelist: Obj[];
  string: string;
  stringlist: string[];
  widget: Widget | null;
  widgetlist: Widget[];
}

export type AttributeValueOf<
  AttrDefs extends AttributeDefinitions,
  AttrName extends keyof AttrDefs
> = AttributeMapping[AttributeTypeOf<AttrDefs[AttrName]>];

export type AttributeValue = AttributeMapping[keyof AttributeMapping];

export function wrapInAppClass<
  T extends BasicObj | ObjUnavailable | BasicWidget | BasicLink | string | null
>(internalValue: T): BasicValueToAttributeValue<T>;

export function wrapInAppClass(
  internalValue: Array<BasicObj | ObjUnavailable>
): Obj[];

export function wrapInAppClass<T extends BasicWidget | BasicLink | string>(
  internalValue: T[]
): BasicValueToAttributeValue<T>[];

export function wrapInAppClass<
  AttrDefs extends AttributeDefinitions,
  AttrName extends keyof AttrDefs & string
>(
  internalValue: BasicAttributeValue<AttributeTypeOf<AttrDefs[AttrName]>>
): AttributeValueOf<AttrDefs, AttrName>;

export function wrapInAppClass<AttrDefs extends AttributeDefinitions>(
  internalValue: BasicObj
): Obj<AttrDefs>;

export function wrapInAppClass<AttrDefs extends AttributeDefinitions>(
  internalValue: BasicObj | null
): Obj<AttrDefs> | null;

export function wrapInAppClass<AttrDefs extends AttributeDefinitions>(
  internalValue: BasicWidget
): Widget<AttrDefs>;

export function wrapInAppClass<
  A extends AttributeType,
  T extends BasicAttributeValue<A> | BasicObj[] | BasicObj | BasicWidget
>(internalValue: T) {
  if (Array.isArray(internalValue)) {
    return (
      internalValue as Array<
        BasicObj | ObjUnavailable | BasicWidget | BasicLink | string
      >
    )
      .map((value) => wrapInAppClass(value))
      .filter((value) => value !== null);
  }

  if (internalValue instanceof BasicObj) {
    return buildAppClassInstance(
      internalValue as unknown as BasicObj,
      objClassFor(internalValue.objClass()) as ObjClass
    );
  }

  if (internalValue instanceof BasicWidget) {
    return buildAppClassInstance(
      internalValue as unknown as BasicWidget,
      widgetClassFor(internalValue.objClass()) as WidgetClass
    );
  }

  if (internalValue instanceof BasicLink) {
    if (!internalValue.hasDestination()) return null;

    return buildAppClassInstance(internalValue as BasicLink, Link);
  }

  if (internalValue instanceof ObjUnavailable) return null;

  return internalValue;
}

export function unwrapAppClass<T>(value: T[]): BasicValue<T>[];
export function unwrapAppClass<T>(value: T): BasicValue<T>;
export function unwrapAppClass<T>(value: T | T[]) {
  if (Array.isArray(value)) return value.map((v) => unwrapAppClass(v));

  if (hasPrivateContent(value)) return value._scrivitoPrivateContent;

  return value;
}

export function unwrapAppAttributes(
  appAttributes: {
    [key: string]: unknown;
  },
  schema: Schema,
  appClassName: string
): NormalizedBasicAttributesWithUnknownValues {
  return mapValues(appAttributes, (value, name) => {
    if (isSystemAttribute(name)) return [value] as [unknown];

    const normalizedTypeInfo = schema.attribute(name);

    if (!normalizedTypeInfo) {
      throw new ArgumentError(
        `Attribute "${name}" is not defined for CMS object ` +
          `class "${appClassName}".`
      );
    }

    const unwrappedValue = unwrapAppClass(value);

    return [unwrappedValue, normalizedTypeInfo] as [
      unknown,
      BasicTypeInfo<AttributeType>
    ];
  });
}

function buildAppClassInstance(
  internalValue: BasicLink,
  appClass: typeof Link
): Link;

function buildAppClassInstance(
  internalValue: BasicObj,
  appClass: ObjClass
): Obj;

function buildAppClassInstance(
  internalValue: BasicWidget,
  appClass: WidgetClass
): Widget;

function buildAppClassInstance(
  internalValue: BasicLink | BasicObj | BasicWidget,
  appClass: typeof Link | ObjClass | WidgetClass
) {
  const externalValue = Object.create(appClass.prototype);
  externalValue._scrivitoPrivateContent = internalValue;

  return externalValue;
}

function hasPrivateContent(value: unknown): value is Value {
  return !!value && !!(value as Value)._scrivitoPrivateContent;
}
