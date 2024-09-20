import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaTicketDataClass() {
  return provideDataClass('Ticket', {
    restApi: pisaConfig('ticket'),
    attributes: () => filterSchema('ticket'),
  })
}
