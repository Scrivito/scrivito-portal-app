import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaContractDataClass() {
  return provideDataClass('Contract', {
    restApi: pisaConfig('contract'),
    attributes: {},
  })
}
