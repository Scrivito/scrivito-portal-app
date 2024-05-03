import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse } from '../../types'
import { acceptLanguageHeader } from '../../../utils/currentLanguage'

export function pisaGdprDataClass() {
  const gdprClient = pisaClient('gdpr')

  return provideDataClass('Gdpr', {
    connection: {
      index: async (params) =>
        gdprClient.get('', {
          params: toClientParams(params),
          headers: acceptLanguageHeader(),
        }) as Promise<DataIndexResponse>,

      get: async (id) =>
        gdprClient.get(id, { headers: acceptLanguageHeader() }),
      update: async (id, data) => gdprClient.patch(id, { data }),
    },
  })
}
