import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaContractDocumentDataClass() {
  return provideDataClass('ContractDocument', {
    restApi: pisaConfig('contract-document'),
    attributes: {},
  })
}
