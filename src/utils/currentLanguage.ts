import { currentLanguage } from 'scrivito'

export function languageHeaders() {
  return { 'Accept-Language': currentLanguage() ?? 'en' }
}
