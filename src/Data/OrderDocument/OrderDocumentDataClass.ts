import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const OrderDocument = provideDataClass('OrderDocument', async () => {
  const restApi = await pisaConfig('portal/order-document')
  if (!restApi) {
    return (
      await import('./orderDocumentParamsFallback')
    ).orderDocumentParamsFallback()
  }

  return { restApi }
})
