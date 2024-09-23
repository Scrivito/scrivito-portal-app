import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaDocumentDataClass() {
  return provideDataClass('Document', {
    restApi: pisaConfig('document'),
    attributes: () => fetchAndFilterAttributes('document'),
  })
}
