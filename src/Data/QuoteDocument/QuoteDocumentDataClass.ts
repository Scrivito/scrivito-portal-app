import { localStorageQuoteDocumentDataClass } from './LocalStorage/localStorageQuoteDocumentDataClass'
import { pisaQuoteDocumentDataClass } from './Pisa/pisaQuoteDocumentDataClass'

export const QuoteDocument = import.meta.env.ENABLE_PISA
  ? pisaQuoteDocumentDataClass()
  : localStorageQuoteDocumentDataClass()
