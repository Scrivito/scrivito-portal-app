import { localStorageServiceObjectDataClass } from './LocalStorage/localStorageServiceObjectDataClass'
import { pisaServiceObjectDataClass } from './Pisa/pisaServiceObjectDataClass'

export const ServiceObjectPromise = import.meta.env.ENABLE_PISA
  ? pisaServiceObjectDataClass()
  : localStorageServiceObjectDataClass()
