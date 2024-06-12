import { localStorageOrderDocumentDataClass } from './LocalStorage/localStorageOrderDocumentDataClass'
import { pisaOrderDocumentDataClass } from './Pisa/pisaOrderDocumentDataClass'

export const OrderDocumentPromise = import.meta.env.ENABLE_PISA
  ? pisaOrderDocumentDataClass()
  : localStorageOrderDocumentDataClass()
