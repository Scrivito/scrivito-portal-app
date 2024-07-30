import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { DataConnection, DataIndexResponse, RawItem } from '../../types'

export function pisaCallbackRequestDataClass() {
  // callback-request is more or less a "singleton". It only offers PUT, GET and DELETE.
  return provideDataClass('CallbackRequest', {
    connection: pisaClient('callback-request').then(
      (apiClient): DataConnection => ({
        index: async () =>
          ({ results: [await apiClient.get('')] }) as DataIndexResponse,
        get: () => apiClient.get(''),
        create: async (data) => apiClient.put('', { data }) as Promise<RawItem>,
        update: async (_id, data) => apiClient.put('', { data }),
        delete: (id) => apiClient.delete(id),
      }),
    ),
  })
}
