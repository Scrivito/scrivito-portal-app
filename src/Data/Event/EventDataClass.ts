import { provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'

const eventClient = pisaClient('event')

export const Event = provideDataClass('Event', {
  connection: {
    index: async (params) =>
      eventClient.get('', {
        params: {
          ...params.filters(),
          _continuation: params.continuation(),
          _order: params.order().length
            ? params
                .order()
                .map((o) => o.join('.'))
                .join(',')
            : undefined,
          _limit: params.limit().toString(),
          _search: params.search() || undefined,
        },
      }) as Promise<{ results: Array<{ _id: string }>; continuation?: string }>,

    get: async (id) => eventClient.get(id),
  },
})
