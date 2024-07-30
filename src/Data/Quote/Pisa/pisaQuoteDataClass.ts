import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaQuoteDataClass() {
  return provideDataClass('Quote', {
    restApi: pisaConfig('quote'),
    attributes: {},
  })
}
