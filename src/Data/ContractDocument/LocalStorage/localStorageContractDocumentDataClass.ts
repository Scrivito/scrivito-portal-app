import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import { DataClassAttributes } from '../../types'

const attributes: DataClassAttributes = {}

export function localStorageContractDocumentDataClass() {
  return provideLocalStorageDataClass('ContractDocument', {
    attributes,
    initialContent: [
      {
        _id: '1',
        contractId: '1E3039CD3CACF294E040A8C00F0177E3',
        documentId: '130C29DABAB24FE99836DD62450283FA',
      },
    ],
  })
}
