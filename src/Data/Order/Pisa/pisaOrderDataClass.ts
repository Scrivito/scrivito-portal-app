import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaOrderDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Order', {
    restApi: pisaConfig('order'),
    attributes,
  })
}
