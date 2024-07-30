import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaQuoteDataClass() {
  return provideDataClass('Quote', {
    restApi: pisaConfig('quote'),
    attributes: {},
  })
}
