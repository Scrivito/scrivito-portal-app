import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export async function localStorageCallbackRequestDataClass() {
  return provideLocalStorageDataClass('CallbackRequest')
}
