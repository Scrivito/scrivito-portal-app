import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    contractId: [
      'reference',
      {
        reverseTitle:
          lang === 'de' ? 'Vertragsdokumente' : 'Contract documents',
        title: lang === 'de' ? 'Vertrag' : 'Contract',
        to: 'Contract',
      },
    ],
    documentId: [
      'reference',
      {
        reverseTitle:
          lang === 'de' ? 'Vertragsdokumente' : 'Contract documents',
        title: lang === 'de' ? 'Dokument' : 'Document',
        to: 'Document',
      },
    ],
  }
}

export function contractDocumentParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(currentLanguage)) === 'de'
        ? 'Vertragsdokument'
        : 'Contract document',
    connection: localStorageDataConnection('ContractDocument', {
      initialContent: [
        {
          _id: '1',
          contractId: '1E3039CD3CACF294E040A8C00F0177E3',
          documentId: '130C29DABAB24FE99836DD62450283FA',
        },
      ],
    }),
  }
}
