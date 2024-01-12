import { provideDataClass, unstable_JrRestApi } from 'scrivito'

const apiPath = '../pisa-api/ticket-message'

// TODO: use `provideDataClass('TicketMessage', { apiPath })` once available (with 1.39.0?)
export const TicketMessage = provideDataClass('TicketMessage', {
  connection: {
    index: (params) =>
      unstable_JrRestApi.fetch(apiPath, {
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

    get: (id) => unstable_JrRestApi.fetch(`${apiPath}/${id}`),
    create: (data) =>
      unstable_JrRestApi.fetch(apiPath, { method: 'post', data }) as Promise<{
        _id: string
      }>,
    update: (id, data) =>
      unstable_JrRestApi.fetch(`${apiPath}/${id}`, { method: 'patch', data }),
    delete: (id) =>
      unstable_JrRestApi.fetch(`${apiPath}/${id}`, { method: 'delete' }),
  },
})
