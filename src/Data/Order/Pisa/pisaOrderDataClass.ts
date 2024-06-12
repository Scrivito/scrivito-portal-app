import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaOrderDataClass() {
  const orderClient = await pisaClient('order')

  return provideDataClass('Order', { restApi: orderClient })
}
