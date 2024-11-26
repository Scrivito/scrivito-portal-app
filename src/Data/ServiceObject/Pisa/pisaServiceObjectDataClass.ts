import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAttributes } from '../../fetchAttributes'

export function pisaServiceObjectDataClass() {
  return provideDataClass('ServiceObject', {
    attributes: () => fetchAttributes('service-object', ['parentId']), // TODO: Remove workaround for #11367 once available
    restApi: pisaConfig('service-object'),
  })
}
