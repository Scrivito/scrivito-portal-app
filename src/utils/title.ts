import { currentLanguage, Obj } from 'scrivito'
import { ensureString } from './ensureString'

export function objTitle(obj: Obj): string {
  return (
    ensureString(obj.get('title')) ||
    ensureString(obj.metadata().get('filename')) ||
    localizeNoTitle()
  )
}

export function localizeNoTitle() {
  switch (currentLanguage()) {
    case 'de':
      return '<kein Titel>'
    case 'fr':
      return '<aucun titre>'
    case 'pl':
      return '<brak tytułu>'
    default:
      return '<untitled>'
  }
}
