import { DataClassAttributes } from '../types'
import { localQuoteDataClass } from './LocalStorage/localQuoteDataClass'
import { pisaQuoteDataClass } from './Pisa/pisaQuoteDataClass'

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
  totalPriceCurrency: 'string',
  type: 'string', // TODO: convert to enum, once fully available
}

export const Quote = import.meta.env.ENABLE_PISA
  ? pisaQuoteDataClass(attributes)
  : localQuoteDataClass(attributes)
