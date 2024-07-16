import { localStorageCallbackRequestDataClass } from './LocalStorage/localStorageCallbackRequestDataClass'
import { pisaCallbackRequestDataClass } from './Pisa/pisaCallbackRequestDataClass'

export const CallbackRequestPromise = import.meta.env.ENABLE_PISA
  ? pisaCallbackRequestDataClass()
  : localStorageCallbackRequestDataClass()
