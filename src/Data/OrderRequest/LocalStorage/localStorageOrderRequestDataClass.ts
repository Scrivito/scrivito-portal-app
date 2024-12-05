import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import { DataClassSchema } from '../../types'

async function attributes(): Promise<DataClassSchema> {
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
