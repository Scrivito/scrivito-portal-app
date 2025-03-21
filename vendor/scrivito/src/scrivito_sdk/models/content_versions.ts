import {
  BasicObj,
  excludeGlobal,
  restrictToContent,
  restrictToSite,
} from 'scrivito_sdk/models';
import { objSpaceScopeExcludingDeleted } from 'scrivito_sdk/models/obj_space_scope_excluding_deleted';

export function versionsOnAllSites(obj: BasicObj): BasicObj[] {
  const contentId = obj.contentId();
  if (!contentId) return [];

  return versionScope(obj).search().dangerouslyUnboundedTake();
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
