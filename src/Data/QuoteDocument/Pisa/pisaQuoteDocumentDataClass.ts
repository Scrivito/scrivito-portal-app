import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaQuoteDocumentDataClass() {
  const quoteDocumentClient = pisaClient('quote-document')

  return provideDataClass('QuoteDocument', {
    restApi: quoteDocumentClient,
  })
}
