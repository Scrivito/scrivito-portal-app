import { localStorageOrderDataClass } from './LocalStorage/localStorageOrderDataClass'
import { pisaOrderDataClass } from './Pisa/pisaOrderDataClass'

export const OrderPromise = import.meta.env.ENABLE_PISA
  ? pisaOrderDataClass()
  : localStorageOrderDataClass()
