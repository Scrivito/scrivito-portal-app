import { DataClassAttributes } from '../types'
import { localStorageQuoteDocumentDataClass } from './LocalStorage/localStorageQuoteDocumentDataClass'
import { pisaQuoteDocumentDataClass } from './Pisa/pisaQuoteDocumentDataClass'

const attributes: DataClassAttributes = {}

export const QuoteDocument = import.meta.env.ENABLE_PISA
  ? pisaQuoteDocumentDataClass(attributes)
  : localStorageQuoteDocumentDataClass(attributes)
