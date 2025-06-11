import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { emptyDataConnection } from '../emptyDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

  const salutation = [
    'enum',
    lang === 'de'
      ? {
          title: 'Anrede',
          values: [
            { value: 'M', title: 'Herr' },
            { value: 'F', title: 'Frau' },
            { value: 'ME', title: 'Mr.' },
            { value: 'FE', title: 'Ms.' },
            { value: 'MS', title: 'Hr.' },
            { value: 'FS', title: 'Fr.' },
            { value: 'MSP', title: 'Señor' },
            { value: 'FSP', title: 'Señora' },
            { value: 'MF', title: 'Monsieur' },
            { value: 'FF', title: 'Madame' },
          ],
        }
      : {
          title: 'Saluation',
          values: [
            { value: 'M', title: 'Herr' },
            { value: 'F', title: 'Frau' },
            { value: 'ME', title: 'Mr.' },
            { value: 'FE', title: 'Ms.' },
            { value: 'MS', title: 'Hr.' },
            { value: 'FS', title: 'Fr.' },
            { value: 'MSP', title: 'Señor' },
            { value: 'FSP', title: 'Señora' },
            { value: 'MF', title: 'Monsieur' },
            { value: 'FF', title: 'Madame' },
          ],
        },
  ] as const

  return {
    email: [
      'string',
      { title: lang === 'de' ? 'E-Mailadresse' : 'Email address' },
    ],
    familyName: [
      'string',
      { title: lang === 'de' ? 'Nachname' : 'Family name' },
    ],
    givenName: ['string', { title: lang === 'de' ? 'Vorname' : 'Given name' }],
    name: ['string', { title: 'Name' }],
    position: ['string', { title: 'Position' }],
    salutation,
    staff: [
      'boolean',
      { title: lang === 'de' ? 'Interner Mitarbeiter?' : 'Internal staff?' },
    ],
  }
}

export function userParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de' ? 'Benutzer' : 'User',
    connection: emptyDataConnection('User'),
  }
}
