import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaOrderDataClass() {
  return provideDataClass('Order', {
    restApi: pisaConfig('order'),
    attributes: () => filterSchema('order'),
  })
}
