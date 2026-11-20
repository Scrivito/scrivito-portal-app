import { Obj } from 'scrivito'

export function portalAppSites(): Obj[] {
  return Obj.onAllSites()
    .where('_path', 'equals', '/')
    .andNot('_siteId', 'equals', null)
    .and('contentFormat', 'startsWith', 'portal-app:')
    .toArray()
}
