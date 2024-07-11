import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaContractDataClass() {
  const contractClient = await pisaClient('contract')

  return provideDataClass('Contract', { restApi: contractClient })
}
