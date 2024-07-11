import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaOrderDataClass() {
  const orderConfig = await pisaConfig('order')

  return provideDataClass('Order', {
    restApi: orderConfig,
    attributes: {},
  })
}
