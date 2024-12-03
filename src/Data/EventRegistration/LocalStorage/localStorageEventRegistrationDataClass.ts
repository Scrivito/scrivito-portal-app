import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import { DataClassSchema } from '../../types'

async function attributes(): Promise<DataClassSchema> {
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
