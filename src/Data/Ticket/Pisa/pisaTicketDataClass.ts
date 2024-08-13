import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaTicketDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Ticket', {
    restApi: pisaConfig('ticket'),
    attributes,
  })
}
