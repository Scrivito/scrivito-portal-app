import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import { DataClassAttributes } from '../../types'

export function localStorageCallbackRequestDataClass(
  attributes: DataClassAttributes,
) {
  return provideLocalStorageDataClass('CallbackRequest', { attributes })
}
