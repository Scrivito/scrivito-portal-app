import { DataClassAttributes } from '../types'
import { localStorageOrderDataClass } from './LocalStorage/localStorageOrderDataClass'
import { pisaOrderDataClass } from './Pisa/pisaOrderDataClass'

const attributes: DataClassAttributes = {
  customer: 'string',
  description: 'string',
  keyword: 'string',
  mainStatus: 'string', // TODO: convert to enum, once fully available
  number: 'string',
  salesPartner: 'string',
  status: 'string', // TODO: convert to enum, once fully available
  termsOfDelivery: 'string', // TODO: convert to enum, once fully available
  termsOfPayment: 'string', // TODO: convert to enum, once fully available
  totalPrice: 'number',
  totalPriceCurrency: 'string',
  type: 'string', // TODO: convert to enum, once fully available
}

export const Order = import.meta.env.ENABLE_PISA
  ? pisaOrderDataClass(attributes)
  : localStorageOrderDataClass(attributes)
