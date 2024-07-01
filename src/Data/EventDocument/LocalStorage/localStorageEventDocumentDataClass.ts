import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export async function localStorageEventDocumentDataClass() {
  return provideLocalStorageDataClass('EventDocument', {
    initialContent: [
      {
        _id: '1',
        documentId: '217C72335FC70467E040A8C00F013355',
        eventId: '4100600152A8FFCBE040007F01002CE3',
      },
    ],
  })
}
