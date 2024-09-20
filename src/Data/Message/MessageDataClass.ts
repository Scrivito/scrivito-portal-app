import { currentLanguage, load } from 'scrivito'
import { DataClassSchema } from '../types'
import { localStorageMessageDataClass } from './LocalStorage/localStorageMessageDataClass'
import { pisaMessageDataClass } from './Pisa/pisaMessageDataClass'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  return {
    _id: ['string', { title: 'ID' }],
    text: ['string', { title: 'Text' }],
    createdAt: ['string', { title: lang === 'de' ? 'Gesendet am' : 'Sent at' }],
  }
}

export const Message = import.meta.env.ENABLE_PISA
  ? pisaMessageDataClass(attributes)
  : localStorageMessageDataClass(attributes)
