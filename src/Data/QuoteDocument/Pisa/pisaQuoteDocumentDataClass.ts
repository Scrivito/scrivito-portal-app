import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export function pisaQuoteDocumentDataClass() {
  const quoteDocumentClient = pisaClient('quote-document')

  return provideDataClass('QuoteDocument', {
    // @ts-expect-error until out of private beta
    restApi: quoteDocumentClient,
  })
}
