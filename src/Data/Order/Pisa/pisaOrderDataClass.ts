import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { languageHeaders } from '../../../utils/currentLanguage'
import { DataIndexResponse } from '../../types'

export async function pisaOrderDataClass() {
  const orderClient = await pisaClient('order')

  return provideDataClass('Order', {
    connection: {
      index: async (params) =>
        orderClient.get('', {
          params: toClientParams(params),
          headers: languageHeaders(),
        }) as Promise<DataIndexResponse>,

      get: async (id) => orderClient.get(id, { headers: languageHeaders() }),
    },
  })
}
