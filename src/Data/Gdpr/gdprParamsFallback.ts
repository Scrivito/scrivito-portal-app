import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { emptyDataConnection } from '../emptyDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

  return {
    active: ['boolean', { title: lang === 'de' ? 'Aktiv?' : 'Active?' }],
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    name: ['string', { title: 'Name' }],
  }
}

export function gdprParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de'
        ? 'DSGVO-Einwilligung'
        : 'GDPR consent',
    connection: emptyDataConnection('Gdpr'),
  }
}
