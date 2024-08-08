import { DataClassAttributes } from '../types'
import { localQuoteDataClass } from './LocalStorage/localQuoteDataClass'
import { pisaQuoteDataClass } from './Pisa/pisaQuoteDataClass'

const attributes: DataClassAttributes = {
  customer: 'string',
  deliveryAt: 'date',
  description: 'string',
  keyword: 'string',
  mainStatus: 'string', // TODO: convert to enum, once fully available
  number: 'string',
  orderAt: 'date',
  quoteAt: 'date',
  salesPartner: 'string',
  status: 'string', // TODO: convert to enum, once fully available
  termsOfDelivery: 'string', // TODO: convert to enum, once fully available
  termsOfPayment: 'string', // TODO: convert to enum, once fully available
  totalPrice: 'number',
  totalPriceCurrency: 'string',
  type: 'string', // TODO: convert to enum, once fully available
  validUntil: 'date',
}

export const Quote = import.meta.env.ENABLE_PISA
  ? pisaQuoteDataClass(attributes)
  : localQuoteDataClass(attributes)
