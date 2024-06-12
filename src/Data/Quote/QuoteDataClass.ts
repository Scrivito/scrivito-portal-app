import { localQuoteDataClass } from './LocalStorage/localQuoteDataClass'
import { pisaQuoteDataClass } from './Pisa/pisaQuoteDataClass'

export const QuotePromise = import.meta.env.ENABLE_PISA
  ? pisaQuoteDataClass()
  : localQuoteDataClass()
