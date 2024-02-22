import { provideDataClass } from 'scrivito'
import { convertBlobAttributes } from '../../utils/convertBlobAttributes'
import { pisaClient } from '../pisaClient'

const ticketClient = pisaClient('ticket')

export const Ticket = provideDataClass('Ticket', {
  connection: {
    index: (params) =>
      ticketClient.get('', {
        params: {
          ...params.filters(),
          _continuation: params.continuation(),
          _order: params.order().length
            ? params
                .order()
                .map((o) => o.join('.'))
                .join(',')
            : undefined,
          _search: params.search() || undefined,
        },
      }) as Promise<{ results: Array<{ _id: string }>; continuation?: string }>,
    get: (id) => ticketClient.get(id),
    create: async (data) =>
      ticketClient.post('', {
        data: await convertBlobAttributes(data),
      }) as Promise<{
        _id: string
      }>,
    update: async (id, data) =>
      ticketClient.patch(id, {
        data: await convertBlobAttributes(data),
      }),
    delete: (id) => ticketClient.delete(id),
  },
})
