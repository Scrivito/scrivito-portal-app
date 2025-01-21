import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    documentId: [
      'reference',
      {
        reverseTitle: lang === 'de' ? 'Eventdokumente' : 'Event documents',
        title: lang === 'de' ? 'Dokument' : 'Document',
        to: 'Document',
      },
    ],
    eventId: [
      'reference',
      {
        reverseTitle: lang === 'de' ? 'Eventdokumente' : 'Event documents',
        title: lang === 'de' ? 'Veranstaltung' : 'Event',
        to: 'Event',
      },
    ],
  }
}

export function localStorageEventDocumentDataClass() {
  return provideLocalStorageDataClass('EventDocument', {
    attributes,
    initialContent: [
      {
        _id: '1',
        documentId: '217C72335FC70467E040A8C00F013355',
        eventId: '4100600152A8FFCBE040007F01002CE3',
      },
    ],
  })
}
