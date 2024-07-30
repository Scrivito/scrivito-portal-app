import { localQuoteDataClass } from './LocalStorage/localQuoteDataClass'
import { pisaQuoteDataClass } from './Pisa/pisaQuoteDataClass'

export const Quote = import.meta.env.ENABLE_PISA
  ? pisaQuoteDataClass()
  : localQuoteDataClass()
