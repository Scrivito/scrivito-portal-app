import { DataClassAttributes } from '../types'
import { localStorageOrderDocumentDataClass } from './LocalStorage/localStorageOrderDocumentDataClass'
import { pisaOrderDocumentDataClass } from './Pisa/pisaOrderDocumentDataClass'

const attributes: DataClassAttributes = {
  orderId: 'string', // TODO: convert to reference, once fully available
  documentId: 'string', // TODO: convert to reference, once fully available
}

export const OrderDocument = import.meta.env.ENABLE_PISA
  ? pisaOrderDocumentDataClass(attributes)
  : localStorageOrderDocumentDataClass(attributes)
