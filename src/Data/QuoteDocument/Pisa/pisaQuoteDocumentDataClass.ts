import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaQuoteDocumentDataClass() {
  const quoteDocumentConfig = await pisaConfig('quote-document')

  return provideDataClass('QuoteDocument', {
    restApi: quoteDocumentConfig,
    attributes: {},
  })
}
