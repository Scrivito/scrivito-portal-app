import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

  return {
    quoteId: [
      'reference',
      {
        reverseTitle: lang === 'de' ? 'Angebotsanfragen' : 'Quote requests',
        title: lang === 'de' ? 'Angebot' : 'Quote',
        to: 'Quote',
      },
    ],
  }
}

export function orderRequestParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de'
        ? 'Bestellanfrage'
        : 'Order request',
    connection: localStorageDataConnection('OrderRequest'),
  }
}
