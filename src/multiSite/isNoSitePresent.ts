import { getLanguageVersions } from '../config/scrivitoSites'

export function isNoSitePresent(): boolean {
  return !getLanguageVersions()?.length
}
