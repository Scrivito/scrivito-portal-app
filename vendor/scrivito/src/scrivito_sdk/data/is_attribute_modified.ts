import isEqual from 'lodash-es/isEqual';

import type {
  ComparisonRange,
  ObjJson,
  ObjSpaceId,
  WidgetJson,
} from 'scrivito_sdk/client';
import { getObjData } from 'scrivito_sdk/data/obj_data_store';

export function isAttributeModified<A extends keyof ObjJson & string>(
  attribute: A,
  comparison: ComparisonRange,
  objId: string,
  widgetId?: string
): boolean {
  return widgetId
    ? isWidgetAttributeModified(attribute, comparison, objId, widgetId)
    : isObjAttributeModified(attribute, comparison, objId);
}

function isObjAttributeModified<A extends keyof ObjJson & string>(
  attribute: A,
  [fromObjSpaceId, toObjSpaceId]: ComparisonRange,
  objId: string
): boolean {
  const objDataBefore = getObjDataIfExistent(fromObjSpaceId, objId);
  const objDataAfter = getObjDataIfExistent(toObjSpaceId, objId);
  if (!objDataBefore || !objDataAfter) return false;

  return !isEqual(
    objDataBefore.getAttribute(attribute),
    objDataAfter.getAttribute(attribute)
  );
}

function isWidgetAttributeModified<A extends keyof WidgetJson & string>(
  attribute: A,
  [fromObjSpaceId, toObjSpaceId]: ComparisonRange,
  objId: string,
  widgetId: string
): boolean {
  const objDataBefore = getObjDataIfExistent(fromObjSpaceId, objId);
  const objDataAfter = getObjDataIfExistent(toObjSpaceId, objId);
  if (!objDataBefore || !objDataAfter) return false;

  if (
    !objDataBefore.widgetExists(widgetId) ||
    !objDataAfter.widgetExists(widgetId)
  ) {
    return false;
  }

  return !isEqual(
    objDataBefore.getWidgetAttribute(widgetId, attribute),
    objDataAfter.getWidgetAttribute(widgetId, attribute)
  );
}

function getObjDataIfExistent(objSpaceId: ObjSpaceId, objId: string) {
  const objData = getObjData(objSpaceId, objId);

  if (objData && !objData.isUnavailable() && !objData.isForbidden()) {
    return objData;
  }
}
