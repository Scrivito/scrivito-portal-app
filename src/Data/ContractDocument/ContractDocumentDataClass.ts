import { DataClassAttributes } from '../types'
import { localStorageContractDocumentDataClass } from './LocalStorage/localStorageContractDocumentDataClass'
import { pisaContractDocumentDataClass } from './Pisa/pisaContractDocumentDataClass'

const attributes: DataClassAttributes = {}

export const ContractDocument = import.meta.env.ENABLE_PISA
  ? pisaContractDocumentDataClass(attributes)
  : localStorageContractDocumentDataClass(attributes)
