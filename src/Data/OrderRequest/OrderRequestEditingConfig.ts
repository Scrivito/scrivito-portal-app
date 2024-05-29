import { provideEditingConfig } from 'scrivito'
import { OrderRequest } from './OrderRequestDataClass'

provideEditingConfig(OrderRequest, {
  title: 'Order request',
  attributes: {
    _id: { title: 'Order request ID' },
    quoteId: { title: 'Quote ID' },
  },
})
