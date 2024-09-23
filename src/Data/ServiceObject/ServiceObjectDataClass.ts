import { localStorageServiceObjectDataClass } from './LocalStorage/localStorageServiceObjectDataClass'
import { pisaServiceObjectDataClass } from './Pisa/pisaServiceObjectDataClass'

export const ServiceObject = import.meta.env.ENABLE_PISA
  ? pisaServiceObjectDataClass()
  : localStorageServiceObjectDataClass()
