import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaQuoteDocumentDataClass() {
  return provideDataClass('QuoteDocument', {
    restApi: pisaConfig('quote-document'),
    attributes: {},
  })
}
