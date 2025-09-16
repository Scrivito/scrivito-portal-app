import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const OrderRequest = provideDataClass('OrderRequest', async () => {
  const restApi = await pisaConfig('portal/order-request')
  if (!restApi) {
    return (
      await import('./orderRequestParamsFallback')
    ).orderRequestParamsFallback()
  }

  return { restApi }
})
