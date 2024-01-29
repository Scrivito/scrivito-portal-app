import { provideDataClass, unstable_JrRestApi } from 'scrivito'
import { convertBlobAttributes } from '../../utils/convertBlobAttributes'

const apiPath = '../pisa-api/ticket'

// TODO: use `provideDataClass('Ticket', { apiPath })` once available (with 1.39.0?)
export const Ticket = provideDataClass('Ticket', {
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
    create: async (data) =>
      unstable_JrRestApi.fetch(apiPath, {
        method: 'post',
        data: await convertBlobAttributes(data),
      }) as Promise<{
        _id: string
      }>,
    update: async (id, data) =>
      unstable_JrRestApi.fetch(`${apiPath}/${id}`, {
        method: 'patch',
        data: await convertBlobAttributes(data),
      }),
    delete: (id) =>
      unstable_JrRestApi.fetch(`${apiPath}/${id}`, { method: 'delete' }),
  },
})
