import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaQuoteDocumentDataClass() {
  return provideDataClass('QuoteDocument', {
    restApi: pisaConfig('quote-document'),
    attributes: () => fetchAndFilterAttributes('quote-document'),
  })
}
