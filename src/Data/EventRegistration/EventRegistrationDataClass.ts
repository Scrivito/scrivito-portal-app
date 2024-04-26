import { localStorageEventRegistrationDataClass } from './LocalStorage/localStorageEventRegistrationDataClass'
import { pisaEventRegistrationDataClass } from './Pisa/pisaEventRegistrationDataClass'

export const EventRegistration = import.meta.env.ENABLE_PISA
  ? pisaEventRegistrationDataClass()
  : localStorageEventRegistrationDataClass()
