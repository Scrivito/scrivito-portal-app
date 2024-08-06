import { DataClassAttributes } from '../types'
import { localStorageTicketDataClass } from './LocalStorage/localStorageTicketDataClass'
import { pisaTicketDataClass } from './Pisa/pisaTicketDataClass'

const attributes: DataClassAttributes = {
  createdBy: 'string', // TODO: convert to reference, once fully available
  description: 'string',
  number: 'string',
  referenceNumber: 'string',
  responsibleAgent: 'string', // TODO: convert to reference, once fully available
  status: 'string', // TODO: convert to enum, once fully available
  title: 'string',
  type: 'string', // TODO: convert to enum, once fully available
}

export const Ticket = import.meta.env.ENABLE_PISA
  ? pisaTicketDataClass(attributes)
  : localStorageTicketDataClass(attributes)
