// @rewire
import difference from 'lodash-es/difference';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';

import { ObjJson, WidgetJson, WidgetPoolJson } from 'scrivito_sdk/client';
import { isSystemAttribute } from 'scrivito_sdk/common';
import {
  REMOVE_THIS_KEY,
  RemoveThisKey,
  isRemoveThisKey,
} from 'scrivito_sdk/data/remove_this_key';

// "interface extends type" is a way to circumvent "use a mapped type instead"
// See https://github.com/microsoft/TypeScript/issues/24220#issuecomment-5737169810
export interface ObjJsonPatch extends _ObjJsonPatch {
  _widget_pool?: WidgetPoolJsonPatch;
}
type _ObjJsonPatch = {
  [attrName in Exclude<keyof ObjJson, '_widget_pool'>]?:
    | ObjJson[attrName]
    | RemoveThisKey
    | WidgetPoolJsonPatch; // sorry, typescript index signature requirement
};

export interface WidgetPoolJsonPatch {
  [key: string]: WidgetJsonPatch | RemoveThisKey | null | undefined;
}

export interface WidgetJsonPatch extends _WidgetJsonPatch {}
type _WidgetJsonPatch = {
  [attrName in keyof WidgetJson]?: WidgetJson[attrName] | RemoveThisKey;
};

export function patchObjJson(
  primitiveObj: ObjJson,
  patch: ObjJsonPatch
): // Usually, required keys are not removed, therefore the same flavour of ObjJson is returned.
// If required keys were removed, then the patch hopefully adds all required keys for a new
// flavour of ObjJson. To express that in a way  that typescript believes it automatically is
// likely difficult / complex.
ObjJson;

export function patchObjJson(
  primitiveObj: null,
  patch: ObjJsonPatch
): ObjJsonPatch;

export function patchObjJson(
  primitiveObj: undefined,
  patch: ObjJsonPatch
): ObjJsonPatch;

export function patchObjJson(
  primitiveObj: ObjJson | null | undefined,
  patch: ObjJsonPatch
): ObjJsonPatch {
  if (!primitiveObj) return patch;
  return patchJson(primitiveObj, patch);
}

export function diffObjJson(
  fromObjJson: ObjJson | null | undefined,
  toObjJson: ObjJson
): ObjJsonPatch {
  if (!fromObjJson) return toObjJson;

  return diffJson(fromObjJson, toObjJson);
}

export function diffWidgetJson(
  fromWidgetJson: WidgetJson,
  toWidgetJson: WidgetJson
): WidgetJsonPatch {
  return diffJson(fromWidgetJson, toWidgetJson);
}

function diffMaybeWidgetJson(
  fromWidgetJson: WidgetJson | undefined,
  toWidgetJson: WidgetJson | undefined
): WidgetJsonPatch | null {
  if (!fromWidgetJson) return toWidgetJson || null;

  if (!toWidgetJson) return null;

  return diffJson(fromWidgetJson, toWidgetJson);
}

export function hasObjContentDiff(
  objJsonA: ObjJson,
  objJsonB: ObjJson
): boolean {
  const patch = diffObjJson(objJsonA, objJsonB);

  return Object.keys(patch).some(isObjContentAttributeName);
}

export function hasWidgetContentDiff(
  widgetJsonBefore: WidgetJson,
  widgetJsonAfter: WidgetJson
): boolean {
  const patch = diffWidgetJson(widgetJsonBefore, widgetJsonAfter);

  return Object.keys(patch).some(isContentAttributeName);
}

function isObjContentAttributeName(attributeName: string) {
  return (
    isContentAttributeName(attributeName) ||
    attributeName === '_path' ||
    attributeName === '_permalink'
  );
}

function isContentAttributeName(attributeName: string) {
  return !isSystemAttribute(attributeName) || attributeName === '_obj_class';
}

function eachKeyFrom<T1, T2>(
  objectA: { [key: string]: T1 | undefined },
  objectB: { [key: string]: T2 | undefined },
  handler: (
    key: string,
    valueInA: T1 | undefined,
    valueInB: T2 | undefined,
    isAttributeOfPatch: boolean
  ) => void
) {
  const keysOfA = Object.keys(objectA);
  const keysOfB = Object.keys(objectB);
  const keysOfAOnly = difference(keysOfA, keysOfB);
  keysOfAOnly.forEach((key) => {
    handler(key, objectA[key], objectB[key], false);
  });
  keysOfB.forEach((key) => {
    handler(key, objectA[key], objectB[key], true);
  });
}

function buildUpdatedWidgetPool(
  widgetPool: WidgetPoolJson,
  widgetPoolPatch: WidgetPoolJsonPatch | undefined
): WidgetPoolJson {
  if (!widgetPoolPatch || isEmpty(widgetPoolPatch)) return widgetPool;

  const updatedWidgetPool: WidgetPoolJson = {};

  eachKeyFrom(
    widgetPool,
    widgetPoolPatch,
    (id, widget, widgetPatch, isKeyOfWidgetPoolPatch) => {
      if (isKeyOfWidgetPoolPatch) {
        if (isRemoveThisKey(widgetPatch)) return;

        if (widgetPatch) {
          if (widget) {
            updatedWidgetPool[id] = patchWidgetJson(widget, widgetPatch);
          } else {
            if (isWidgetJson(widgetPatch)) {
              updatedWidgetPool[id] = widgetPatch;
            }
          }
        }
      } else {
        updatedWidgetPool[id] = widget;
      }
    }
  );

  return updatedWidgetPool;
}

function buildPatchEntry<T, Resolution>(
  valueA: T | undefined,
  valueB: T | undefined,
  fnHandleBoth: () => Resolution
): T | RemoveThisKey | Resolution {
  // Note: the return type `undefined` is actually impossible,
  // because `valueA` and `valueB` are not both undefined
  if (valueA === undefined) return valueB!;
  if (valueB === undefined) return REMOVE_THIS_KEY;

  return fnHandleBoth();
}

function buildWidgetPoolPatch(
  widgetPoolA: WidgetPoolJson | undefined,
  widgetPoolB: WidgetPoolJson | undefined
): WidgetPoolJsonPatch | undefined {
  if (widgetPoolA === widgetPoolB) return undefined;

  if (!widgetPoolA) return widgetPoolB;

  const patch: WidgetPoolJsonPatch = {};

  eachKeyFrom(widgetPoolA, widgetPoolB || {}, (widgetId, widgetA, widgetB) => {
    const widgetValue = buildPatchEntry(widgetA, widgetB, () => {
      const widgetPatch = diffMaybeWidgetJson(widgetA, widgetB);

      if (!isEmpty(widgetPatch)) return widgetPatch;
    });

    if (widgetValue !== undefined) {
      patch[widgetId] = widgetValue;
    }
  });

  return patch;
}

function diffJson(fromJson: ObjJson, toJson: ObjJson): ObjJsonPatch;
function diffJson(fromJson: WidgetJson, toJson: WidgetJson): WidgetJsonPatch;
function diffJson(
  fromJson: ObjJson | WidgetJson,
  toJson: ObjJson | WidgetJson
): ObjJsonPatch | WidgetJsonPatch {
  const patch: ObjJsonPatch | WidgetJsonPatch = {};

  eachKeyFrom(fromJson, toJson, (attribute, valueInA, valueInB) => {
    if (attribute === '_widget_pool') {
      const widgetPoolPatch = buildWidgetPoolPatch(
        valueInA as WidgetPoolJson | undefined,
        valueInB as WidgetPoolJson | undefined
      );

      if (!isEmpty(widgetPoolPatch)) {
        patch._widget_pool = widgetPoolPatch;
      }
    } else {
      const patchValue = buildPatchEntry(valueInA, valueInB, () => {
        if (!isEqual(valueInA, valueInB)) return valueInB;
      });

      if (patchValue !== undefined) {
        patch[attribute] = patchValue;
      }
    }
  });

  return patch;
}

function patchWidgetJson(
  primitiveWidget: WidgetJson,
  patch: WidgetJsonPatch
): WidgetJson {
  return patchJson(primitiveWidget, patch);
}

function patchJson(primitiveObj: ObjJson, patch: ObjJsonPatch): ObjJson;
function patchJson(
  primitiveObj: WidgetJson,
  patch: WidgetJsonPatch
): WidgetJson;
function patchJson(
  primitiveObj: ObjJson | WidgetJson,
  patch: ObjJsonPatch | WidgetJsonPatch
) {
  const updatedPrimitiveObj: Partial<ObjJson> | Partial<WidgetJson> = {};

  eachKeyFrom(
    primitiveObj,
    patch,
    (attribute, objValue, patchValue, isAttributeOfPatch) => {
      if (attribute === '_widget_pool') {
        updatedPrimitiveObj._widget_pool = buildUpdatedWidgetPool(
          (objValue as WidgetPoolJson | null | undefined) || {},
          patchValue as WidgetPoolJson | undefined
        );
      } else if (isAttributeOfPatch) {
        const simplePatchValue = patchValue as Exclude<
          typeof patchValue,
          WidgetPoolJsonPatch
        >;
        if (isPatchValueToKeep(simplePatchValue)) {
          updatedPrimitiveObj[attribute] = simplePatchValue;
        }
      } else {
        updatedPrimitiveObj[attribute] = objValue;
      }
    }
  );

  return updatedPrimitiveObj;
}

function isPatchValueToKeep<T>(v: T | RemoveThisKey | undefined): v is T {
  return v !== undefined && !isRemoveThisKey(v);
}

// This is a minor cheat: we assume that `widgetPatch` does not include any `RemoveThisKey` values
function isWidgetJson(widgetPatch: WidgetJsonPatch): widgetPatch is WidgetJson {
  return typeof widgetPatch._obj_class === 'string';
}
