import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataConnection, DataIndexResponse, RawItem } from '../../types'
import { convertBlobAttributes } from '../../../utils/convertBlobAttributes'

export async function pisaMessageDataClass() {
  return provideDataClass('Message', {
    connection: pisaClient('message').then(
      (messageClient): DataConnection => ({
        index: (params) =>
          messageClient.get('', {
            params: toClientParams(params),
          }) as Promise<DataIndexResponse>,
        get: (id) => messageClient.get(id),
        create: async (data) =>
          messageClient.post('', {
            data: await convertBlobAttributes(data),
          }) as Promise<RawItem>,
        update: async (id, data) =>
          messageClient.patch(id, {
            data: await convertBlobAttributes(data),
          }),
        delete: (id) => messageClient.delete(id),
      }),
    ),
  })
}
