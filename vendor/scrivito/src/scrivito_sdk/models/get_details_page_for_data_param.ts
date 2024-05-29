import {
  BasicObj,
  currentObjSpaceId,
  objSpaceScopeExcludingDeleted,
} from 'scrivito_sdk/models';

export function getDetailsPageForDataParam(
  dataParam: string,
  siteId: string | null
): BasicObj | null {
  return objSpaceScopeExcludingDeleted(currentObjSpaceId())
    .search()
    .and('_dataParam', 'equals', dataParam)
    .and('_siteId', 'equals', siteId)
    .first();
}
