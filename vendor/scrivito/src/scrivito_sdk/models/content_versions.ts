import {
  BasicObj,
  excludeGlobal,
  restrictToContent,
  restrictToSite,
} from 'scrivito_sdk/models';
import { objSpaceScopeExcludingDeleted } from 'scrivito_sdk/models/obj_space_scope_excluding_deleted';

export function versionsOnAllSites(
  obj: BasicObj,
  limit: number | 'unbounded',
): BasicObj[] {
  const contentId = obj.contentId();
  if (!contentId) return [];

  const search = versionScope(obj).search();

  return limit === 'unbounded'
    ? search.dangerouslyUnboundedTake()
    : search.take(limit);
}

export function countVersionsOnAllSites(obj: BasicObj): number {
  const contentId = obj.contentId();
  if (!contentId) return 0;

  return versionScope(obj).search().count();
}

export function versionOnSite(obj: BasicObj, siteId: string): BasicObj | null {
  const contentId = obj.contentId();
  if (!contentId) return null;

  return (
    versionScope(obj).and(restrictToSite(siteId)).search().take(1)[0] || null
  );
}

function versionScope(obj: BasicObj) {
  return objSpaceScopeExcludingDeleted(obj.objSpaceId())
    .and(restrictToContent(obj.contentId()))
    .and(excludeGlobal);
}
