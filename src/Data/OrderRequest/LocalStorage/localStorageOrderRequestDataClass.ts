import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

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

export function localStorageOrderRequestDataClass() {
  return provideLocalStorageDataClass('OrderRequest', { attributes })
}
