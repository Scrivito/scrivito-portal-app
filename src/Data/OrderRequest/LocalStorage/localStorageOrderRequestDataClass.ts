import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import { DataClassAttributes } from '../../types'

const attributes: DataClassAttributes = {}

export function localStorageOrderRequestDataClass() {
  return provideLocalStorageDataClass('OrderRequest', { attributes })
}
