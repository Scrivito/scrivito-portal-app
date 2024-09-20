import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaServiceObjectDataClass() {
  return provideDataClass('ServiceObject', {
    restApi: pisaConfig('service-object'),
    attributes: () => filterSchema('service-object'),
  })
}
