import { currentLanguage, editorLanguage, load } from 'scrivito'
import { setupI18n, MessageCatalog } from './core'

export function setupVisitorI18n<M extends MessageCatalog>(messages: M) {
  return setupI18n({ locale: currentLanguage() ?? 'en', messages })
}

export async function setupEditorI18n<M extends MessageCatalog>(messages: M) {
  return setupI18n({
    locale: (await load(() => editorLanguage())) ?? 'en',
    messages,
  })
}
