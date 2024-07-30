import { localStorageTicketDataClass } from './LocalStorage/localStorageTicketDataClass'
import { pisaTicketDataClass } from './Pisa/pisaTicketDataClass'

export const Ticket = import.meta.env.ENABLE_PISA
  ? pisaTicketDataClass()
  : localStorageTicketDataClass()
