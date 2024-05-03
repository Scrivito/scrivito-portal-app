import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse, RawItem } from '../../types'
import { convertBlobAttributes } from '../../../utils/convertBlobAttributes'
import { languageHeaders } from '../../../utils/currentLanguage'

export function pisaDocumentDataClass() {
  const documentClient = pisaClient('document')

  return provideDataClass('Document', {
    connection: {
      index: (params) =>
        documentClient.get('', {
          params: toClientParams(params),
          headers: languageHeaders(),
        }) as Promise<DataIndexResponse>,
      get: (id) =>
        documentClient.get(id, {
          headers: languageHeaders(),
        }),
      create: async (data) =>
        documentClient.post('', {
          data: await convertBlobAttributes(data),
        }) as Promise<RawItem>,
      update: async (id, data) =>
        documentClient.patch(id, {
          data: await convertBlobAttributes(data),
        }),
      delete: (id) => documentClient.delete(id),
    },
  })
}
