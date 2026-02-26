import { setupVisitorI18n } from '../i18n'
import { Obj } from 'scrivito'
import { ensureString } from './ensureString'
import messages from './i18n.visitor.json'

const t = setupVisitorI18n(messages)

export function objTitle(obj: Obj): string {
  return (
    ensureString(obj.get('title')) ||
    ensureString(obj.metadata().get('filename')) ||
    localizeNoTitle()
  )
}

export function localizeNoTitle(): string {
  return t('noTitle')
}
