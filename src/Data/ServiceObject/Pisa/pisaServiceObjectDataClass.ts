import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaServiceObjectDataClass() {
  return provideDataClass('ServiceObject', {
    restApi: pisaConfig('service-object'),
    attributes: () => fetchAndFilterAttributes('service-object'),
  })
}
