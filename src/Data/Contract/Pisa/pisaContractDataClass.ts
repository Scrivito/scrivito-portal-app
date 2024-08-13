import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaContractDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Contract', {
    restApi: pisaConfig('contract'),
    attributes,
  })
}
