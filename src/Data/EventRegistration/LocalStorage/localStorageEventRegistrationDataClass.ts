import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export async function localStorageEventRegistrationDataClass() {
  return provideLocalStorageDataClass('EventRegistration', {})
}
