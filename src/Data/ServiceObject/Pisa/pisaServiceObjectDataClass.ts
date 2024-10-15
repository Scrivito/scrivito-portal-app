import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaServiceObjectDataClass() {
  return provideDataClass('ServiceObject', {
    restApi: pisaConfig('service-object'),
  })
}
