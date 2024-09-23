import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaOrderDataClass() {
  return provideDataClass('Order', {
    restApi: pisaConfig('order'),
    attributes: () => fetchAndFilterAttributes('order'),
  })
}
