import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse } from '../../types'
import { acceptLanguageHeader } from '../../../utils/currentLanguage'

export function pisaEventDataClass() {
  const eventClient = pisaClient('event')

  return provideDataClass('Event', {
    connection: {
      index: async (params) =>
        eventClient.get('', {
          params: toClientParams(params),
          headers: acceptLanguageHeader(),
        }) as Promise<DataIndexResponse>,

      get: async (id) =>
        eventClient.get(id, { headers: acceptLanguageHeader() }),
    },
  })
}
