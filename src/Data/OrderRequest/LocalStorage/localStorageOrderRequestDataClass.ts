import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export async function localStorageOrderRequestDataClass() {
  return provideLocalStorageDataClass('OrderRequest')
}
