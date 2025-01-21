import {
  ClientError,
  DataConnection,
  DataConnectionResultItem,
  provideDataClass,
} from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { fetchAttributes } from '../../fetchAttributes'

export function pisaCallbackRequestDataClass() {
  // callback-request is more or less a "singleton". It only offers PUT, GET and DELETE.
  return provideDataClass('CallbackRequest', {
    attributes: () => fetchAttributes('callback-request'),
    connection: pisaClient('callback-request').then(
      (apiClient): DataConnection => ({
        index: async () => {
          try {
            return {
              results: [(await apiClient.get('')) as DataConnectionResultItem],
            }
          } catch (error) {
            if (
              error instanceof ClientError &&
              error.code === 'record.not_found'
            ) {
              return { results: [] }
            }

            throw error
          }
        },
        get: () => apiClient.get(''),
        create: async (data) =>
          apiClient.put('', { data }) as Promise<DataConnectionResultItem>,
        update: async (_id, data) => apiClient.put('', { data }),
        delete: (id) => apiClient.delete(id),
      }),
    ),
  })
}
