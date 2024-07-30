import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataConnection, DataIndexResponse } from '../../types'

export function pisaServiceObjectDataClass() {
  return provideDataClass('ServiceObject', {
    connection: pisaClient('service-object').then(
      (serviceObjectClient): DataConnection => ({
        index: (params) =>
          serviceObjectClient.get('', {
            params: toClientParams(params),
          }) as Promise<DataIndexResponse>,
        get: (id) => serviceObjectClient.get(id),
      }),
    ),
  })
}
