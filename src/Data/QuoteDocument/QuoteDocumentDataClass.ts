import { localStorageQuoteDocumentDataClass } from './LocalStorage/localStorageQuoteDocumentDataClass'
import { pisaQuoteDocumentDataClass } from './Pisa/pisaQuoteDocumentDataClass'

export const QuoteDocumentPromise = import.meta.env.ENABLE_PISA
  ? pisaQuoteDocumentDataClass()
  : localStorageQuoteDocumentDataClass()
