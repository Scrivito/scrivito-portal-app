import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaContractDocumentDataClass() {
  return provideDataClass('ContractDocument', {
    restApi: pisaConfig('contract-document'),
    attributes: () => filterSchema('contract-document'),
  })
}
