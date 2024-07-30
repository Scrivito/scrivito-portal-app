import { ClientError, provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { DataIndexResponse, RawItem } from '../../types'

export async function pisaCallbackRequestDataClass() {
  const callbackRequestClient = await pisaClient('callback-request')

  // callback-request is more or less a "singleton". It only offers PUT, GET and DELETE.
  return provideDataClass('CallbackRequest', {
    connection: {
      index: async () => {
        try {
          return {
            results: [await callbackRequestClient.get('')],
          } as DataIndexResponse
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
      get: () => callbackRequestClient.get(''),
      create: async (data) =>
        callbackRequestClient.put('', { data }) as Promise<RawItem>,
      update: async (_id, data) => callbackRequestClient.put('', { data }),
      delete: (id) => callbackRequestClient.delete(id),
    },
  })
}
