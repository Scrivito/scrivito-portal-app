import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

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
    title: async () =>
      (await load(() => currentLanguage())) === 'de'
        ? 'Veranstaltungsanmeldung'
        : 'Event registration',
    connection: localStorageDataConnection('EventRegistration'),
  }
}
