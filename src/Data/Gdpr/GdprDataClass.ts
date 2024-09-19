import { currentLanguage, load } from 'scrivito'
import { DataClassSchema } from '../types'
import { localStorageGdprDataClass } from './LocalStorage/localStorageGdprDataClass'
import { pisaGdprDataClass } from './Pisa/pisaGdprDataClass'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  return {
    _id: ['string', { title: 'ID' }],
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    name: ['string', { title: 'Name' }],
  }
}

export const Gdpr = import.meta.env.ENABLE_PISA
  ? pisaGdprDataClass(attributes)
  : localStorageGdprDataClass(attributes)
