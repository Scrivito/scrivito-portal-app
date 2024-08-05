import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaTicketDataClass() {
  return provideDataClass('Ticket', {
    restApi: pisaConfig('ticket'),
    attributes: {},
  })
}
