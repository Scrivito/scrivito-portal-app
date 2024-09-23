import { localStorageQuoteDataClass } from './LocalStorage/localStorageQuoteDataClass'
import { pisaQuoteDataClass } from './Pisa/pisaQuoteDataClass'

export const Quote = import.meta.env.ENABLE_PISA
  ? pisaQuoteDataClass()
  : localStorageQuoteDataClass()
