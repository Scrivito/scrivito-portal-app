import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaQuoteDocumentDataClass(attributes: DataClassAttributes) {
  return provideDataClass('QuoteDocument', {
    restApi: pisaConfig('quote-document'),
    attributes,
  })
}
