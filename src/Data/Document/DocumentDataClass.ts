import { provideDataClass } from 'scrivito'
import { convertBlobAttributes } from '../../utils/convertBlobAttributes'
import { pisaClient } from '../pisaClient'

const documentClient = pisaClient('document')

export const Document = provideDataClass('Document', {
  connection: {
    index: (params) =>
      documentClient.get('', {
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
    get: (id) => documentClient.get(id),
    create: async (data) =>
      documentClient.post('', {
        data: await convertBlobAttributes(data),
      }) as Promise<{
        _id: string
      }>,
    update: async (id, data) =>
      documentClient.patch(id, {
        data: await convertBlobAttributes(data),
      }),
    delete: (id) => documentClient.delete(id),
  },
})
