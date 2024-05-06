import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { languageHeaders } from '../../../utils/currentLanguage'
import { DataIndexResponse } from '../../types'

export function pisaQuoteDataClass() {
  const quoteClient = pisaClient('quote')

  return provideDataClass('Quote', {
    connection: {
      index: async (params) =>
        quoteClient.get('', {
          params: toClientParams(params),
          headers: languageHeaders(),
        }) as Promise<DataIndexResponse>,

      get: async (id) => quoteClient.get(id, { headers: languageHeaders() }),
    },
  })
}
