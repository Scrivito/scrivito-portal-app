import { DataClassAttributes } from '../types'
import { localStorageOrderDocumentDataClass } from './LocalStorage/localStorageOrderDocumentDataClass'
import { pisaOrderDocumentDataClass } from './Pisa/pisaOrderDocumentDataClass'

const attributes: DataClassAttributes = {}

export const OrderDocument = import.meta.env.ENABLE_PISA
  ? pisaOrderDocumentDataClass(attributes)
  : localStorageOrderDocumentDataClass(attributes)
