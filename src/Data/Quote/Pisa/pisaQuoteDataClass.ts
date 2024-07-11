import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaQuoteDataClass() {
  const quoteConfig = await pisaConfig('quote')

  return provideDataClass('Quote', { restApi: quoteConfig, attributes: {} })
}
