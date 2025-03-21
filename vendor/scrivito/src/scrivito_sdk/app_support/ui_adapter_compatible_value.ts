// Supported types must not exceed the supported types mentioned here:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
import isDate from 'lodash-es/isDate';

import { BasicObjSearch, ObjSearchParams } from 'scrivito_sdk/models';
import { ObjSearch } from 'scrivito_sdk/realm/obj_search';

type ArrayEntryType<T> = T extends (infer U)[] ? U : never;

// https://github.com/piotrwitek/utility-types/blob/ba66c895c7e52263268d179c142088f3e245a033/src/mapped-types.ts#L241-L244
/**
 * @desc From `T` remove a set of properties by value matching `ValueType`.
 * @example
 *   type Props = { req: number; reqUndef: number | undefined; opt?: string; };
 *
 *   // Expect: { reqUndef: number | undefined; opt?: string; }
 *   type Props = OmitByValue<Props, number>;
 *   // Expect: { opt?: string; }
 *   type Props = OmitByValue<Props, number | undefined>;
 */
type OmitByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? never : Key }[keyof T]
>;

type PrimitiveValue<T> = T extends ObjSearch
  ? ObjSearchParams
  : T extends string | number | boolean | null | Date
  ? T
  : T extends unknown[]
  ? PrimitiveArrayValue<T>
  : T extends ObjectValue
  ? OmitByValue<PrimitiveObjectValue<T>, never>
  : undefined;

type PrimitiveObjectValue<T> = {
  [key in keyof T]: PrimitiveEntryValue<T[key]>;
};
type PrimitiveArrayValue<T extends unknown[]> = Array<
  PrimitiveEntryValue<ArrayEntryType<T>>
>;

type PrimitiveEntryValue<T> = Exclude<PrimitiveValue<T>, undefined>;

interface ObjectValue {
  [key: string]: unknown;
}

// (inner) values translated to undefined are removed from arrays and objects they are referred from
export function uiAdapterCompatibleValue<T>(value: T): PrimitiveValue<T>;
export function uiAdapterCompatibleValue(value: unknown) {
  if (!value) return value;

  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      return value;
    case 'object':
      if (isObjSearch(value)) return uiCompatibleSearchParams(value);
      if (isDate(value)) return value;
      if (Array.isArray(value)) return uiCompatibleArrayValue(value);
      return uiCompatibleObjectValue(value as ObjectValue);
  }
}

function uiCompatibleArrayValue<T extends unknown>(array: T[]) {
  const copy: Array<PrimitiveValue<T>> = [];

  array.forEach((item) => {
    const compatibleItem = uiAdapterCompatibleValue(item);
    if (compatibleItem !== undefined) {
      copy.push(compatibleItem);
    }
  });
  return copy;
}

function uiCompatibleObjectValue(object: ObjectValue) {
  const copy: PrimitiveObjectValue<ObjectValue> = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];

    const compatibleValueForKey = uiAdapterCompatibleValue(value);
    if (compatibleValueForKey !== undefined) {
      copy[key] = compatibleValueForKey;
    }
  });
  return copy;
}

function isObjSearch<T>(v: T | ObjSearch): v is ObjSearch {
  return (
    (v as unknown as ObjSearch)._scrivitoPrivateContent instanceof
    BasicObjSearch
  );
}

function uiCompatibleSearchParams(objSearch: ObjSearch) {
  const { query, ...params } = objSearch._scrivitoPrivateContent.params();
  const sanitizedQuery = query.filter((q) => !isSiteRelated(q.field));
  return uiAdapterCompatibleValue({ ...params, query: sanitizedQuery });
}

function isSiteRelated(field: string | string[]) {
  return typeof field === 'string'
    ? field === '_site_id'
    : field.indexOf('_site_id') !== -1;
}
