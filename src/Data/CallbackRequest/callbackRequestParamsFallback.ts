import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { emptyDataConnection } from '../emptyDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

  return {
    message: ['string', { title: lang === 'de' ? 'Nachricht' : 'Message' }],
  }
}

export function callbackRequestParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de'
        ? 'Rückrufanfrage'
        : 'Callback request',
    connection: emptyDataConnection('CallbackRequest'),
  }
}
