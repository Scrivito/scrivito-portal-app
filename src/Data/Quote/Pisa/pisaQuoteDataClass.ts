import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaQuoteDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Quote', {
    restApi: pisaConfig('quote'),
    attributes,
  })
}
