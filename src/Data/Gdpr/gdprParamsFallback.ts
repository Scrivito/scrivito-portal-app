import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

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
      (await load(currentLanguage)) === 'de'
        ? 'DSGVO-Einwilligung'
        : 'GDPR consent',
    connection: localStorageDataConnection('Gdpr', {
      prepareData: async (data) => ({
        active: data.active,
        _id: 'F9BB0AAA22C947BAE030A8C00C015B91',
        name: 'Contact by telephone',
        description: 'I agree to be contacted by telephone.',
      }),
      initialContent: [
        {
          _id: 'F9BB0AAA22C947BAE030A8C00C015B91',
          name: 'Contact by telephone',
          description: 'I agree to be contacted by telephone.',
          active: true,
        },
      ],
    }),
  }
}
