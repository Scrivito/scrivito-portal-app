import { localStorageEventDataClass } from './LocalStorage/localStorageEventDataClass'
import { pisaEventDataClass } from './Pisa/pisaEventDataClass'

export const EventPromise = import.meta.env.ENABLE_PISA
  ? pisaEventDataClass()
  : localStorageEventDataClass()
