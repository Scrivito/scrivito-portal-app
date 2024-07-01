import { localStorageEventDocumentDataClass } from './LocalStorage/localStorageEventDocumentDataClass'
import { pisaEventDocumentDataClass } from './Pisa/pisaEventDocumentDataClass'

export const EventDocumentPromise = import.meta.env.ENABLE_PISA
  ? pisaEventDocumentDataClass()
  : localStorageEventDocumentDataClass()
