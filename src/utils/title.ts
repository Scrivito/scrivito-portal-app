import { currentLanguage, Obj } from 'scrivito'
import { ensureString } from './ensureString'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

export function objTitle(obj: Obj): string {
  return (
    ensureString(obj.get('title')) ||
    ensureString(obj.metadata().get('filename')) ||
    localizeNoTitle()
  )
}

export function localizeNoTitle(): string {
  return i18n.t('noTitle')
}
