import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaOrderDataClass() {
  return provideDataClass('Order', {
    restApi: pisaConfig('order'),
    attributes: {},
  })
}
