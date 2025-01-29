import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    keyword: ['string', { title: lang === 'de' ? 'Stichwort' : 'Keyword' }],
  }
}

export function opportunityParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(currentLanguage)) === 'de' ? 'Chance' : 'Opportunity',
    connection: localStorageDataConnection('Opportunity'),
  }
}
