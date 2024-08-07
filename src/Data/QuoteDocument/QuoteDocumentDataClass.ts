import { DataClassAttributes } from '../types'
import { localStorageQuoteDocumentDataClass } from './LocalStorage/localStorageQuoteDocumentDataClass'
import { pisaQuoteDocumentDataClass } from './Pisa/pisaQuoteDocumentDataClass'

const attributes: DataClassAttributes = {
  quoteId: 'string', // TODO: convert to reference, once fully available
  documentId: 'string', // TODO: convert to reference, once fully available
}

export const QuoteDocument = import.meta.env.ENABLE_PISA
  ? pisaQuoteDocumentDataClass(attributes)
  : localStorageQuoteDocumentDataClass(attributes)
