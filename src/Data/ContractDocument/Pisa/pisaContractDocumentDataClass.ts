import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaContractDocumentDataClass() {
  return provideDataClass('ContractDocument', {
    restApi: pisaConfig('contract-document'),
    attributes: () => fetchAndFilterAttributes('contract-document'),
  })
}
