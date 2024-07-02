import { localContractDataClass } from './LocalStorage/localContractDataClass'
import { pisaContractDataClass } from './Pisa/pisaContractDataClass'

export const ContractPromise = import.meta.env.ENABLE_PISA
  ? pisaContractDataClass()
  : localContractDataClass()
