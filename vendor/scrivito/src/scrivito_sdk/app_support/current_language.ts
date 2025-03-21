import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import { getRootObjFrom, restrictToSite } from 'scrivito_sdk/models';
import { currentAppSpace } from './current_app_space';

/** @public */
export function currentLanguage(): string | null {
  const siteId = currentSiteId();
  if (!siteId) return null;

  return (
    getRootObjFrom(currentAppSpace().and(restrictToSite(siteId)))?.language() ??
    null
  );
}
