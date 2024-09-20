import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaQuoteDataClass() {
  return provideDataClass('Quote', {
    restApi: pisaConfig('quote'),
    attributes: () => filterSchema('quote'),
  })
}
