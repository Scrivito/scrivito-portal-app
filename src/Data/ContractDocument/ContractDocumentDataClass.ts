import { DataClassAttributes } from '../types'
import { localStorageContractDocumentDataClass } from './LocalStorage/localStorageContractDocumentDataClass'
import { pisaContractDocumentDataClass } from './Pisa/pisaContractDocumentDataClass'

const attributes: DataClassAttributes = {
  contractId: 'string', // TODO: convert to reference, once fully available
  documentId: 'string', // TODO: convert to reference, once fully available
}

export const ContractDocument = import.meta.env.ENABLE_PISA
  ? pisaContractDocumentDataClass(attributes)
  : localStorageContractDocumentDataClass(attributes)
