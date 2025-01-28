import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'

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

export function localStorageEventRegistrationDataClass() {
  return provideLocalStorageDataClass('EventRegistration', { attributes })
}
