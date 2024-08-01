import { localStorageOrderRequestDataClass } from './LocalStorage/localStorageOrderRequestDataClass'
import { pisaOrderRequestDataClass } from './Pisa/pisaOrderRequestDataClass'

export const OrderRequest = import.meta.env.ENABLE_PISA
  ? pisaOrderRequestDataClass()
  : localStorageOrderRequestDataClass()
