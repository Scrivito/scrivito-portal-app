// @rewire
import { ObjSpaceId } from 'scrivito_sdk/client';
import { ObjData } from 'scrivito_sdk/data/obj_data';
import { getObjData } from 'scrivito_sdk/data/obj_data_store';
import { hasWidgetContentDiff } from 'scrivito_sdk/data/obj_patch';

export type Modification = null | 'new' | 'edited' | 'deleted';

export function getWidgetModification(
  fromObjSpaceId: ObjSpaceId,
  toObjSpaceId: ObjSpaceId,
  objId: string,
  widgetId: string
): Modification {
  const objDataBefore = getObjData(fromObjSpaceId, objId);
  const objDataAfter = getObjData(toObjSpaceId, objId);

  if (!objDataBefore || !objDataAfter) {
    return null;
  }

  if (objDataBefore.isUnavailable() && objDataAfter.isUnavailable()) {
    return null;
  }

  if (objDataBefore.isUnavailable() && !objDataAfter.isUnavailable()) {
    return 'new';
  }

  if (!objDataBefore.isUnavailable() && objDataAfter.isUnavailable()) {
    return 'deleted';
  }

  return getModificationForWidget(objDataBefore, objDataAfter, widgetId);
}

function getModificationForWidget(
  objDataBefore: ObjData,
  objDataAfter: ObjData,
  widgetId: string
): Modification {
  const widgetJsonBefore = objDataBefore.getWidgetWithBadPerformance(widgetId);
  const widgetJsonAfter = objDataAfter.getWidgetWithBadPerformance(widgetId);

  if (widgetJsonBefore) {
    if (widgetJsonAfter) {
      return hasWidgetContentDiff(widgetJsonBefore, widgetJsonAfter)
        ? 'edited'
        : null;
    }

    return 'deleted';
  } else {
    return widgetJsonAfter ? 'new' : null;
  }
}
