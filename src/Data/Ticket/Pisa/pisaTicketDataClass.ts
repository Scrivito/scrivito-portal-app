import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaTicketDataClass() {
  return provideDataClass('Ticket', {
    restApi: pisaConfig('ticket'),
    attributes: () => fetchAndFilterAttributes('ticket'),
  })
}
