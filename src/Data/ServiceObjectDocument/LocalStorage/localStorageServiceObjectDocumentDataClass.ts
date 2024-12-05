import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import { DataClassSchema } from '../../types'

async function attributes(): Promise<DataClassSchema> {
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

export function localStorageServiceObjectDocumentDataClass() {
  return provideLocalStorageDataClass('ServiceObjectDocument', {
    attributes,
    initialContent: [
      {
        _id: '1',
        serviceObjectId: '7681FF616BF5460FAD90A6BB5BC386B4',
        documentId: '217C72335FBF0467E040A8C00F013355',
      },
    ],
  })
}
