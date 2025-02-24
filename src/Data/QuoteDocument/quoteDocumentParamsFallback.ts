import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    documentId: [
      'reference',
      {
        reverseTitle: lang === 'de' ? 'Angebotsdokumente' : 'Quote documents',
        title: lang === 'de' ? 'Dokument' : 'Document',
        to: 'Document',
      },
    ],
    quoteId: [
      'reference',
      {
        reverseTitle: lang === 'de' ? 'Angebotsdokumente' : 'Quote documents',
        title: lang === 'de' ? 'Angebot' : 'Quote',
        to: 'Quote',
      },
    ],
  }
}

export function quoteDocumentParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(currentLanguage)) === 'de'
        ? 'Angebotsdokument'
        : 'Quote document',
    connection: localStorageDataConnection('QuoteDocument', {
      initialContent: [
        {
          _id: '123',
          quoteId: 'C6D30A8964AF42C795529F1CCEB3484E',
          documentId: '217C72335FC70467E040A8C00F013355',
        },
        {
          _id: '456',
          quoteId: '18EEDF590CBA51BFE040A8C00F012317',
          documentId: '130C29DABAB24FE99836DD62450283FA',
        },
        {
          _id: '789',
          quoteId: '2969FBD752154BC399ED8CC624BF0345',
          documentId: '217C72335FC70467E040A8C00F013355',
        },
        {
          _id: '1011',
          quoteId: '2969FBD752154BC399ED8CC624BF0345',
          documentId: '130C29DABAB24FE99836DD62450283FA',
        },
      ],
    }),
  }
}
