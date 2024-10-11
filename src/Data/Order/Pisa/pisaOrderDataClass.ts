import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaOrderDataClass() {
  return provideDataClass('Order', { restApi: pisaConfig('order') })
}
