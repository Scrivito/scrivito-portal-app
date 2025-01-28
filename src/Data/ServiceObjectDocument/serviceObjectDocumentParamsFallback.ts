import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    documentId: [
      'reference',
      {
        reverseTitle:
          lang === 'de' ? 'Serviceobjektdokumente' : 'Service object documents',
        title: lang === 'de' ? 'Dokument' : 'Document',
        to: 'Document',
      },
    ],
    serviceObjectId: [
      'reference',
      {
        reverseTitle:
          lang === 'de' ? 'Serviceobjektdokumente' : 'Service object documents',
        title: lang === 'de' ? 'Serviceobjekt' : 'Service object',
        to: 'ServiceObject',
      },
    ],
  }
}

export function serviceObjectDocumentParamsFallback() {
  return {
    attributes,
    connection: localStorageDataConnection('ServiceObjectDocument', {
      initialContent: [
        {
          _id: '1',
          serviceObjectId: '7681FF616BF5460FAD90A6BB5BC386B4',
          documentId: '217C72335FBF0467E040A8C00F013355',
        },
      ],
    }),
  }
}
