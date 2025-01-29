import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    eventId: [
      'reference',
      {
        reverseTitle: lang === 'de' ? 'Anmeldungen' : 'Registrations',
        title: lang === 'de' ? 'Veranstaltung' : 'Event',
        to: 'Event',
      },
    ],
  }
}

export function eventRegistrationParamsFallback() {
  return {
    attributes,
    connection: localStorageDataConnection('EventRegistration'),
  }
}
