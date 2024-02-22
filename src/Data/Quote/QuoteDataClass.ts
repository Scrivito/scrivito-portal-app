import { provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'

const quoteClient = pisaClient('quote')

// @ts-expect-error until out of private beta
export const Quote = provideDataClass('Quote', { restApi: quoteClient })
