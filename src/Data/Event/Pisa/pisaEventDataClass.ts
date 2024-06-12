import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse } from '../../types'

export async function pisaEventDataClass() {
  const eventClient = await pisaClient('event')

  return provideDataClass('Event', {
    connection: {
      index: async (params) =>
        eventClient.get('', {
          params: toClientParams(params),
        }) as Promise<DataIndexResponse>,

      get: async (id) => eventClient.get(id),
    },
  })
}
