import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaContractDataClass() {
  const contractConfig = await pisaConfig('contract')

  return provideDataClass('Contract', {
    restApi: contractConfig,
    attributes: {},
  })
}
