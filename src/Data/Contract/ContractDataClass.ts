import { localStorageContractDataClass } from './LocalStorage/localStorageContractDataClass'
import { pisaContractDataClass } from './Pisa/pisaContractDataClass'

export const Contract = import.meta.env.ENABLE_PISA
  ? pisaContractDataClass()
  : localStorageContractDataClass()
