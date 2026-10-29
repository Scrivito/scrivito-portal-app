import {
  ObjJson,
  WidgetPoolJson,
  isUnavailableObjJson,
  withEachAttributeJson,
} from 'scrivito_sdk/client';
import { InternalError } from 'scrivito_sdk/common';

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

  const oldPool = oldState._widget_pool;
  if (!oldPool) return obj;

  const repairedPool: WidgetPoolJson = { ...(obj._widget_pool ?? {}) };
  let restoredInPass: boolean;
  let iterations = 0;

  do {
    restoredInPass = false;

    // this should never happen (since objs cannot have more than 1000 widgets)
    // but if there is some bug somewhere, better crash than infinite loop
    if (++iterations > 1000) throw new InternalError();

    withEachAttributeJson(
      { ...obj, _widget_pool: repairedPool },
      ([type, data]) => {
        if (type !== 'widgetlist') return;

        data.forEach((widgetId) => {
          if (
            repairedPool[widgetId] === undefined &&
            oldPool[widgetId] !== undefined
          ) {
            repairedPool[widgetId] = oldPool[widgetId];
            restoredInPass = true;
          }
        });
      },
    );

    // Restored widgets may themselves reference further dangling widgets,
    // so we repeat until no more can be restored.
    // Terminates because each pass must add at least one widget to
    // repairedPool (or we stop), and oldPool is finite.
  } while (restoredInPass);

  return { ...obj, _widget_pool: repairedPool };
}
