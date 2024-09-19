import { currentLanguage, load } from 'scrivito'
import { DataClassSchema } from '../types'
import { localStorageOpportunityDataClass } from './LocalStorage/localStorageOpportunityDataClass'
import { pisaOpportunityDataClass } from './Pisa/pisaOpportunityDataClass'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  return {
    _id: ['string', { title: 'ID' }],
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    keyword: ['string', { title: lang === 'de' ? 'Stichwort' : 'Keyword' }],
  }
}

export const Opportunity = import.meta.env.ENABLE_PISA
  ? pisaOpportunityDataClass(attributes)
  : localStorageOpportunityDataClass(attributes)
