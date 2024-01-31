import { provideDataClass } from 'scrivito'

const apiPath = '../pisa-api/quote-document'

// @ts-expect-error until out of private beta
export const QuoteDocument = provideDataClass('QuoteDocument', { apiPath })
