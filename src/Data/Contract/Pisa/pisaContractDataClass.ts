import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaContractDataClass() {
  return provideDataClass('Contract', {
    restApi: pisaConfig('contract'),
    attributes: () => filterSchema('contract'),
  })
}
