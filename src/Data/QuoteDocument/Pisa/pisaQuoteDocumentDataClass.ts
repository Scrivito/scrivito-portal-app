import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaQuoteDocumentDataClass() {
  return provideDataClass('QuoteDocument', {
    restApi: pisaConfig('quote-document'),
    attributes: () => filterSchema('quote-document'),
  })
}
