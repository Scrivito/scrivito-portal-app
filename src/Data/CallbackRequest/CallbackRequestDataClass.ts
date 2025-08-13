import {
  ClientError,
  DataAttributeDefinitions,
  DataConnectionResultItem,
  provideDataClass,
} from 'scrivito'
import { pisaClient } from '../pisaClient'
import { fetchSchema } from '../fetchSchema'

let pisaSchemaPromise: Promise<{
  attributes: DataAttributeDefinitions
  title?: string
}>

async function pisaSchema() {
  pisaSchemaPromise ??= fetchSchema('portal/callback-request')
  return pisaSchemaPromise
}

export const CallbackRequest = provideDataClass('CallbackRequest', async () => {
  const apiClient = await pisaClient('portal/callback-request')
  if (!apiClient) {
    return (
      await import('./callbackRequestParamsFallback')
    ).callbackRequestParamsFallback()
  }

  // callback-request is more or less a "singleton". It only offers PUT, GET and DELETE.
  return {
    // attributes and title are defined as functions to trigger potential
    // IAM login redirects only, when the information is actually needed.
    attributes: async () => (await pisaSchema()).attributes,
    title: async () => (await pisaSchema()).title,
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
})
