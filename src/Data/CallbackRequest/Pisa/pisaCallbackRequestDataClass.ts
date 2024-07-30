import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { DataConnection, DataIndexResponse, RawItem } from '../../types'

export function pisaCallbackRequestDataClass() {
  // callback-request is more or less a "singleton". It only offers PUT, GET and DELETE.
  return provideDataClass('CallbackRequest', {
    connection: pisaClient('callback-request').then(
      (callbackRequestClient): DataConnection => ({
        index: async () =>
          ({
            results: [await callbackRequestClient.get('')],
          }) as DataIndexResponse,
        get: () => callbackRequestClient.get(''),
        create: async (data) =>
          callbackRequestClient.put('', { data }) as Promise<RawItem>,
        update: async (_id, data) => callbackRequestClient.put('', { data }),
        delete: (id) => callbackRequestClient.delete(id),
      }),
    ),
  })
}
