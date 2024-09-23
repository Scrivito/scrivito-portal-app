import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaQuoteDataClass() {
  return provideDataClass('Quote', {
    restApi: pisaConfig('quote'),
    attributes: () => fetchAndFilterAttributes('quote'),
  })
}
