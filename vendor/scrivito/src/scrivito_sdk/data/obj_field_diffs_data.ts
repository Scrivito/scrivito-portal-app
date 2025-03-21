import {
  ComparisonRange,
  FieldDiff,
  FieldDiffs,
  ObjFieldDiffs,
  ObjSpaceId,
  WidgetlistDiff,
  cmsRetrieval,
  isWorkspaceObjSpaceId,
} from 'scrivito_sdk/client';
import { equals, underscore } from 'scrivito_sdk/common';
import { getObjVersion } from 'scrivito_sdk/data';
import { createLoadableCollection } from 'scrivito_sdk/loadable';

type CollectionKey = [ObjSpaceId, ObjSpaceId, string];

const loadableCollection = createLoadableCollection({
  loadElement: ([from, to, objId]: CollectionKey) => ({
    loader: () => cmsRetrieval.retrieveObjFieldDiffs(from, to, objId),
    invalidation: () => `${getVersion(from, objId)}:${getVersion(to, objId)}`,
  }),
});

export function getFieldDiff(
  from: ObjSpaceId,
  to: ObjSpaceId,
  attributeName: string,
  objId: string,
  widgetId?: string
): FieldDiff | null {
  const fieldDiffs = getFieldDiffs(from, to, objId, widgetId);

  const typeAndDiff = fieldDiffs[underscore(attributeName)];
  if (!typeAndDiff) return null;

  return typeAndDiff[1];
}

function getFieldDiffs(
  from: ObjSpaceId,
  to: ObjSpaceId,
  objId: string,
  widgetId?: string
): FieldDiffs {
  if (equals(from, to)) return {};

  const objFieldDiffs: ObjFieldDiffs = loadableCollection
    .get([from, to, objId])
    .getWithDefault({});

  if (widgetId) {
    const widgetPool = objFieldDiffs._widget_pool;
    return (widgetPool && widgetPool[widgetId]) || {};
  }

  return objFieldDiffs as FieldDiffs;
}

export function isWidgetlistDiff(
  diff: FieldDiff | null
): diff is WidgetlistDiff {
  return !!diff && diff.format === 'widgetlist_diff';
}

// For test purpose only.
export function storeObjFieldDiffs(
  diffs: ObjFieldDiffs,
  objId: string,
  [from, to]: ComparisonRange
): void {
  loadableCollection.get([from, to, objId]).set(diffs);
}

function getVersion(objSpaceId: ObjSpaceId, objId: string) {
  return isWorkspaceObjSpaceId(objSpaceId)
    ? getObjVersion(objSpaceId, objId)
    : '';
}
