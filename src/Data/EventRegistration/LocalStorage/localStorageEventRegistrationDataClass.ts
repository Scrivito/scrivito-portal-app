import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export function localStorageEventRegistrationDataClass() {
  return provideLocalStorageDataClass('EventRegistration', {})
}
