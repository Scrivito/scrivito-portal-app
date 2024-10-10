import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import { DataClassSchema } from '../../types'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  return {
    message: ['string', { title: lang === 'de' ? 'Nachricht' : 'Message' }],
  }
}

export function localStorageCallbackRequestDataClass() {
  return provideLocalStorageDataClass('CallbackRequest', { attributes })
}
