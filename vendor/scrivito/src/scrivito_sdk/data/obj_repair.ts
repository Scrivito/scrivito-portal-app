import {
  ExistentObjJson,
  ObjJson,
  isUnavailableObjJson,
  withEachAttributeJson,
} from 'scrivito_sdk/client';

/** repairs dangling widgets, by restoring them from the old state
 *
 * a dangling widget can occur due to a race condition:
 * the backend's garbage collection clears a no-longer-referenced widget
 * from the pool, and in parallel the client introduces a new reference to that widget.
 *
 * this would lead to a situation where there is a widgetlist with an ID
 * but not such widget exists in the pool. The backend would reject the update
 * and the replication would crash.
 *
 * @return a new version of obj, with dangling widgets restored from the old state
 */
export function repairDanglingWidgets(obj: ObjJson, oldState?: ObjJson) {
  if (
    !oldState ||
    isUnavailableObjJson(oldState) ||
    isUnavailableObjJson(obj)
  ) {
    // nothing to repair
    return obj;
  }

  const danglingWidgetIds = danglingWidgetReferencesIn(obj);
  if (danglingWidgetIds.length === 0) return obj;

  const restoredWidgets = Object.fromEntries(
    danglingWidgetIds.map((id) => [id, oldState._widget_pool?.[id]])
  );

  return {
    ...obj,

    _widget_pool: {
      ...(obj._widget_pool ?? {}),
      ...restoredWidgets,
    },
  };
}

function danglingWidgetReferencesIn(obj: ExistentObjJson) {
  const danglingIds: string[] = [];

  withEachAttributeJson(obj, ([type, data]) => {
    if (type !== 'widgetlist') return;

    data.forEach((widgetId) => {
      if (obj._widget_pool?.[widgetId] === undefined) {
        danglingIds.push(widgetId);
      }
    });
  });

  return danglingIds;
}
