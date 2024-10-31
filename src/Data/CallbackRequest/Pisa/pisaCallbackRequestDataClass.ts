import { ClientError, provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { DataConnection, ResultItem } from '../../types'
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
              results: [(await apiClient.get('')) as ResultItem],
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
          apiClient.put('', { data }) as Promise<ResultItem>,
        update: async (_id, data) => apiClient.put('', { data }),
        delete: (id) => apiClient.delete(id),
      }),
    ),
  })
}
