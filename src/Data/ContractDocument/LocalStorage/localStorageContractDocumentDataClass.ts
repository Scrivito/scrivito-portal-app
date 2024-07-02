import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export async function localStorageContractDocumentDataClass() {
  return provideLocalStorageDataClass('ContractDocument', {
    initialContent: [
      {
        _id: '1',
        contractId: '1E3039CD3CACF294E040A8C00F0177E3',
        documentId: '130C29DABAB24FE99836DD62450283FA',
      },
    ],
  })
}
