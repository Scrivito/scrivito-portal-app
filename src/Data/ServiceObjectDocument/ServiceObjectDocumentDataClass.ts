import { localStorageServiceObjectDocumentDataClass } from './LocalStorage/localStorageServiceObjectDocumentDataClass'
import { pisaServiceObjectDocumentDataClass } from './Pisa/pisaServiceObjectDocumentDataClass'

export const ServiceObjectDocument = import.meta.env.ENABLE_PISA
  ? pisaServiceObjectDocumentDataClass()
  : localStorageServiceObjectDocumentDataClass()
