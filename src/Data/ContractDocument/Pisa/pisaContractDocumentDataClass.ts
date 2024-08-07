import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaContractDocumentDataClass(attributes: DataClassAttributes) {
  return provideDataClass('ContractDocument', {
    restApi: pisaConfig('contract-document'),
    attributes,
  })
}
