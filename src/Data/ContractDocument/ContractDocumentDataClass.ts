import { localStorageContractDocumentDataClass } from './LocalStorage/localStorageContractDocumentDataClass'
import { pisaContractDocumentDataClass } from './Pisa/pisaContractDocumentDataClass'

export const ContractDocumentPromise = import.meta.env.ENABLE_PISA
  ? pisaContractDocumentDataClass()
  : localStorageContractDocumentDataClass()
