import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaContractDocumentDataClass() {
  const contractDocumentConfig = await pisaConfig('contract-document')

  return provideDataClass('ContractDocument', {
    restApi: contractDocumentConfig,
    attributes: {},
  })
}
