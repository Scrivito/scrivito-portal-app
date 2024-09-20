import { currentLanguage, load } from 'scrivito'
import { DataClassSchema } from '../types'
import { localStorageCallbackRequestDataClass } from './LocalStorage/localStorageCallbackRequestDataClass'
import { pisaCallbackRequestDataClass } from './Pisa/pisaCallbackRequestDataClass'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  return {
    _id: ['string', { title: 'ID' }],
    message: ['string', { title: lang === 'de' ? 'Nachricht' : 'Message' }],
  }
}

export const CallbackRequest = import.meta.env.ENABLE_PISA
  ? pisaCallbackRequestDataClass(attributes)
  : localStorageCallbackRequestDataClass(attributes)
