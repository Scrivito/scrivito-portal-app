import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaDocumentDataClass() {
  return provideDataClass('Document', {
    restApi: pisaConfig('document'),
    attributes: () => filterSchema('document'),
  })
}
