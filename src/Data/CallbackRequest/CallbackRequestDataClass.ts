import {
  ClientError,
  DataConnectionResultItem,
  provideDataClass,
} from 'scrivito'
import { pisaClient } from '../pisaClient'
import { fetchAttributes } from '../fetchAttributes'
import { fetchTitle } from '../fetchTitle'

export const CallbackRequest = provideDataClass(
  'CallbackRequest',
  (async () => {
    const apiClient = await pisaClient('callback-request')
    if (!apiClient) {
      return (
        await import('./callbackRequestParamsFallback')
      ).callbackRequestParamsFallback()
    }

    // callback-request is more or less a "singleton". It only offers PUT, GET and DELETE.
    return {
      attributes: () => fetchAttributes('callback-request'),
      title: () => fetchTitle('callback-request'),
      connection: {
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
      },
    }
  })(),
)
