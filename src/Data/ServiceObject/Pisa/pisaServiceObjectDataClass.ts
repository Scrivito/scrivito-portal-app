import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse } from '../../types'
import { acceptLanguageHeader } from '../../../utils/currentLanguage'

export function pisaServiceObjectDataClass() {
  const serviceObjectClient = pisaClient('service-object')

  return provideDataClass('ServiceObject', {
    connection: {
      index: (params) =>
        serviceObjectClient.get('', {
          params: toClientParams(params),
          headers: acceptLanguageHeader(),
        }) as Promise<DataIndexResponse>,
      get: (id) =>
        serviceObjectClient.get(id, { headers: acceptLanguageHeader() }),
    },
  })
}
