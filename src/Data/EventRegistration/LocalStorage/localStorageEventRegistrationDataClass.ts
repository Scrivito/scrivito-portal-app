import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import { DataClassAttributes } from '../../types'

export function localStorageEventRegistrationDataClass(
  attributes: DataClassAttributes,
) {
  return provideLocalStorageDataClass('EventRegistration', { attributes })
}
