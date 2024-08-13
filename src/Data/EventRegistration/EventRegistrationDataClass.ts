import { DataClassAttributes } from '../types'
import { localStorageEventRegistrationDataClass } from './LocalStorage/localStorageEventRegistrationDataClass'
import { pisaEventRegistrationDataClass } from './Pisa/pisaEventRegistrationDataClass'

const attributes: DataClassAttributes = {}

export const EventRegistration = import.meta.env.ENABLE_PISA
  ? pisaEventRegistrationDataClass(attributes)
  : localStorageEventRegistrationDataClass(attributes)
