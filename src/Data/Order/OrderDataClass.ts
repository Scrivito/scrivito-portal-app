import { localStorageOrderDataClass } from './LocalStorage/localStorageOrderDataClass'
import { pisaOrderDataClass } from './Pisa/pisaOrderDataClass'

export const Order = import.meta.env.ENABLE_PISA
  ? pisaOrderDataClass()
  : localStorageOrderDataClass()
