import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaContractDataClass() {
  return provideDataClass('Contract', {
    restApi: pisaConfig('contract'),
    attributes: () => fetchAndFilterAttributes('contract'),
  })
}
