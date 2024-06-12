import { Obj } from 'scrivito'

export function getCurrentLanguage(): undefined | string {
  const currentSiteLanguage = Obj.root()?.language()
  return currentSiteLanguage === null ? 'en' : currentSiteLanguage
}
