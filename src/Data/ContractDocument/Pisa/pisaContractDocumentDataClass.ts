import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaContractDocumentDataClass() {
  const contractDocumentClient = await pisaClient('contract-document')

  return provideDataClass('ContractDocument', {
    restApi: contractDocumentClient,
  })
}
