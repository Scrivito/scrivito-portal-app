import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataConnection, DataIndexResponse, RawItem } from '../../types'
import { convertBlobAttributes } from '../../../utils/convertBlobAttributes'

export function pisaMessageDataClass() {
  return provideDataClass('Message', {
    connection: pisaClient('message').then(
      (apiClient): DataConnection => ({
        index: (params) =>
          apiClient.get('', {
            params: toClientParams(params),
          }) as Promise<DataIndexResponse>,
        get: (id) => apiClient.get(id),
        create: async (data) =>
          apiClient.post('', {
            data: await convertBlobAttributes(data),
          }) as Promise<RawItem>,
        update: async (id, data) =>
          apiClient.patch(id, { data: await convertBlobAttributes(data) }),
        delete: (id) => apiClient.delete(id),
      }),
    ),
  })
}
