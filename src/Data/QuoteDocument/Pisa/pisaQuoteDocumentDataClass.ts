import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaQuoteDocumentDataClass() {
  const quoteDocumentClient = await pisaClient('quote-document')

  return provideDataClass('QuoteDocument', {
    restApi: quoteDocumentClient,
  })
}
