import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaContractDocumentDataClass() {
  return provideDataClass('ContractDocument', {
    restApi: pisaConfig('contract-document'),
  })
}
