import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import { DataClassSchema } from '../../types'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  return {
    _id: ['string', { title: 'ID' }],
    message: ['string', { title: lang === 'de' ? 'Nachricht' : 'Message' }],
  }
}

export function localStorageCallbackRequestDataClass() {
  return provideLocalStorageDataClass('CallbackRequest', { attributes })
}
