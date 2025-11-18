import { Obj } from 'scrivito'

export function defaultSiteVersions() {
  return Obj.onAllSites()
    .where('_path', 'equals', '/')
    .and('_contentId', 'equals', import.meta.env.SCRIVITO_DEFAULT_CONTENT_ID)
    .andNot('_siteId', 'equals', null)
}
