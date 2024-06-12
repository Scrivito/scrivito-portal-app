import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export async function localStorageOrderDocumentDataClass() {
  return provideLocalStorageDataClass('OrderDocument', {
    initialContent: [
      {
        _id: '123',
        orderId: 'EEDF141E8169451884B23C979526C51A',
        documentId: '217C72335FC70467E040A8C00F013355',
      },
      {
        _id: '456',
        orderId: '3DDF9E11BF6E1F8DE040007F01005605',
        documentId: '130C29DABAB24FE99836DD62450283FA',
      },
      {
        _id: '789',
        orderId: '4076A80ED49B4D85E040007F01001A11',
        documentId: '217C72335FC70467E040A8C00F013355',
      },
      {
        _id: '1011',
        orderId: '4076A80ED49B4D85E040007F01001A11',
        documentId: '130C29DABAB24FE99836DD62450283FA',
      },
    ],
  })
}
