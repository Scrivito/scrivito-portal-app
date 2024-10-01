import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import { DataClassAttributes } from '../../types'

const attributes: DataClassAttributes = {}

export function localStorageEventRegistrationDataClass() {
  return provideLocalStorageDataClass('EventRegistration', { attributes })
}
