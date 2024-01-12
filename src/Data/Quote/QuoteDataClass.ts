import { provideDataClass } from 'scrivito'

const apiPath = '../pisa-api/quote'

// @ts-expect-error until out of private beta
export const Quote = provideDataClass('Quote', { apiPath })
