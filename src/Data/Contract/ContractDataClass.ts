import { DataClassAttributes } from '../types'
import { localContractDataClass } from './LocalStorage/localContractDataClass'
import { pisaContractDataClass } from './Pisa/pisaContractDataClass'

const attributes: DataClassAttributes = {
  category: 'string', // TODO: convert to enum, once fully available
  internalDepartment: 'string',
  keyword: 'string',
  minimumTermUnit: 'string', // TODO: convert to enum, once fully available
  number: 'string',
  partner: 'string',
  status: 'string', // TODO: convert to enum, once fully available
  type: 'string', // TODO: convert to enum, once fully available
}

export const Contract = import.meta.env.ENABLE_PISA
  ? pisaContractDataClass(attributes)
  : localContractDataClass(attributes)
