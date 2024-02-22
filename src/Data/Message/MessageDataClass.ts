import { provideDataClass } from 'scrivito'
import { convertBlobAttributes } from '../../utils/convertBlobAttributes'
import { pisaClient } from '../pisaClient'

const messageClient = pisaClient('message')

export const Message = provideDataClass('Message', {
  connection: {
    index: (params) =>
      messageClient.get('', {
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

    get: (id) => messageClient.get(id),
    create: async (data) =>
      messageClient.post('', {
        data: await convertBlobAttributes(data),
      }) as Promise<{
        _id: string
      }>,
    update: async (id, data) =>
      messageClient.patch(id, {
        data: await convertBlobAttributes(data),
      }),
    delete: (id) => messageClient.delete(id),
  },
})
