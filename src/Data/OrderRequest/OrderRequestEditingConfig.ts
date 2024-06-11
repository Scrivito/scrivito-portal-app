import { provideEditingConfig } from 'scrivito'
import { OrderRequestPromise } from './OrderRequestDataClass'

OrderRequestPromise.then((OrderRequest) => {
  provideEditingConfig(OrderRequest, {
    title: 'Order request',
    attributes: {
      _id: { title: 'Order request ID' },
      quoteId: { title: 'Quote ID' },
    },
  })
})
