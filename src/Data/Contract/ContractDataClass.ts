import { DataClassAttributes } from '../types'
import { localContractDataClass } from './LocalStorage/localContractDataClass'
import { pisaContractDataClass } from './Pisa/pisaContractDataClass'

const attributes: DataClassAttributes = {
  cancelationEndAt: 'date',
  category: 'string', // TODO: convert to enum, once fully available
  endAt: 'date',
  internalDepartment: 'string',
  keyword: 'string',
  minimumTerm: 'number',
  minimumTermUnit: 'string', // TODO: convert to enum, once fully available
  number: 'string',
  partner: 'string',
  startAt: 'date',
  status: 'string', // TODO: convert to enum, once fully available
  termExtensionEndAt: 'date',
  totalPrice: 'number',
  type: 'string', // TODO: convert to enum, once fully available
}

export const Contract = import.meta.env.ENABLE_PISA
  ? pisaContractDataClass(attributes)
  : localContractDataClass(attributes)
