import { DataClassAttributes } from '../types'
import { localStorageTicketDataClass } from './LocalStorage/localStorageTicketDataClass'
import { pisaTicketDataClass } from './Pisa/pisaTicketDataClass'

const attributes: DataClassAttributes = {
  description: 'string',
  number: 'string',
  referenceNumber: 'string',
  status: 'string', // TODO: convert to enum, once fully available
  title: 'string',
  type: 'string', // TODO: convert to enum, once fully available
}

export const Ticket = import.meta.env.ENABLE_PISA
  ? pisaTicketDataClass(attributes)
  : localStorageTicketDataClass(attributes)
