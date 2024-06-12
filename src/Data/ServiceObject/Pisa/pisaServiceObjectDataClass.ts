import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse } from '../../types'

export async function pisaServiceObjectDataClass() {
  const serviceObjectClient = await pisaClient('service-object')

  return provideDataClass('ServiceObject', {
    connection: {
      index: (params) =>
        serviceObjectClient.get('', {
          params: toClientParams(params),
        }) as Promise<DataIndexResponse>,
      get: (id) => serviceObjectClient.get(id),
    },
  })
}
