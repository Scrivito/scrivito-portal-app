import { DataClassAttributes } from '../types'
import { localStorageOrderRequestDataClass } from './LocalStorage/localStorageOrderRequestDataClass'
import { pisaOrderRequestDataClass } from './Pisa/pisaOrderRequestDataClass'

const attributes: DataClassAttributes = {}

export const OrderRequest = import.meta.env.ENABLE_PISA
  ? pisaOrderRequestDataClass(attributes)
  : localStorageOrderRequestDataClass(attributes)
