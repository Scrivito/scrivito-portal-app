import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse, RawItem } from '../../types'
import { convertBlobAttributes } from '../../../utils/convertBlobAttributes'

export async function pisaTicketDataClass() {
  const ticketClient = pisaClient('ticket')

  return provideDataClass('Ticket', {
    connection: {
      index: (params) =>
        ticketClient.get('', {
          params: toClientParams(params),
        }) as Promise<DataIndexResponse>,
      get: (id) => ticketClient.get(id),
      create: async (data) =>
        ticketClient.post('', {
          data: await convertBlobAttributes(data),
        }) as Promise<RawItem>,
      update: async (id, data) =>
        ticketClient.patch(id, {
          data: await convertBlobAttributes(data),
        }),
      delete: (id) => ticketClient.delete(id),
    },
  })
}
