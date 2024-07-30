import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataConnection, DataIndexResponse } from '../../types'

export function pisaEventDataClass() {
  return provideDataClass('Event', {
    connection: pisaClient('event').then(
      (eventClient): DataConnection => ({
        index: async (params) =>
          eventClient.get('', {
            params: toClientParams(params),
          }) as Promise<DataIndexResponse>,

        get: async (id) => eventClient.get(id),
      }),
    ),
  })
}
