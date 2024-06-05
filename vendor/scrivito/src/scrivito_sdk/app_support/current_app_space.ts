import { isComparisonActive } from 'scrivito_sdk/app_support/editing_context';
import {
  ObjScope,
  currentObjSpaceId,
  excludeDeletedObjs,
  objSpaceScope,
} from 'scrivito_sdk/models';

/** returns an ObjScope that represents what is currently being displayed by
 * the application, e.g. the current workspace.
 */
export function currentAppSpace(): ObjScope {
  const currentObjSpace = objSpaceScope(currentObjSpaceId());
  return isComparisonActive()
    ? currentObjSpace
    : currentObjSpace.and(excludeDeletedObjs);
}
