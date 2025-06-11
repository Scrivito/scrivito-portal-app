import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { emptyDataConnection } from '../emptyDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

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

export function eventDocumentParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de'
        ? 'Veranstaltungsdokument'
        : 'Event document',
    connection: emptyDataConnection('EventDocument'),
  }
}
