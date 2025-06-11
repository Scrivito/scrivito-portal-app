import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { emptyDataConnection } from '../emptyDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

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
      (await load(() => currentLanguage())) === 'de'
        ? 'Vertragsdokument'
        : 'Contract document',
    connection: emptyDataConnection('ContractDocument'),
  }
}
