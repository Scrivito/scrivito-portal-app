import { localStorageServiceObjectDocumentDataClass } from './LocalStorage/localStorageServiceObjectDocumentDataClass'
import { pisaServiceObjectDocumentDataClass } from './Pisa/pisaServiceObjectDocumentDataClass'

export const ServiceObjectDocumentPromise = import.meta.env.ENABLE_PISA
  ? pisaServiceObjectDocumentDataClass()
  : localStorageServiceObjectDocumentDataClass()
