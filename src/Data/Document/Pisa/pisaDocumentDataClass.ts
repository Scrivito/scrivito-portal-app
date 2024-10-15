import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaDocumentDataClass() {
  return provideDataClass('Document', { restApi: pisaConfig('document') })
}
