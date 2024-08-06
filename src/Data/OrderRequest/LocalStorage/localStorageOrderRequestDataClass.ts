import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import { DataClassAttributes } from '../../types'

export function localStorageOrderRequestDataClass(
  attributes: DataClassAttributes,
) {
  return provideLocalStorageDataClass('OrderRequest', { attributes })
}
