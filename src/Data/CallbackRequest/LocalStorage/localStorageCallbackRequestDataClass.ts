import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    message: ['string', { title: lang === 'de' ? 'Nachricht' : 'Message' }],
  }
}

export function localStorageCallbackRequestDataClass() {
  return provideLocalStorageDataClass('CallbackRequest', { attributes })
}
