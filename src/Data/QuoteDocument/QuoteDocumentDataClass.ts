import { provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'

const quoteDocumentClient = pisaClient('quote-document')

export const QuoteDocument = provideDataClass('QuoteDocument', {
  // @ts-expect-error until out of private beta
  restApi: quoteDocumentClient,
})
