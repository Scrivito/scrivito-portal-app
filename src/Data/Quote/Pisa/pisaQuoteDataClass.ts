import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaQuoteDataClass() {
  const quoteClient = await pisaClient('quote')

  return provideDataClass('Quote', { restApi: quoteClient })
}
