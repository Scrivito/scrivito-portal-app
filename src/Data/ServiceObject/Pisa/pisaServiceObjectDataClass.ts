import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataConnection, DataIndexResponse } from '../../types'

export function pisaServiceObjectDataClass() {
  return provideDataClass('ServiceObject', {
    connection: pisaClient('service-object').then(
      (apiClient): DataConnection => ({
        index: (params) =>
          apiClient.get('', {
            params: toClientParams(params),
          }) as Promise<DataIndexResponse>,
        get: (id) => apiClient.get(id),
      }),
    ),
  })
}
