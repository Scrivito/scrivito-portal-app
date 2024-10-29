import { provideEditingConfig } from 'scrivito'
import { OrderRequest } from './OrderRequestDataClass'

provideEditingConfig(OrderRequest, {
  title: 'Order request',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    quoteId: { title: 'Quote' },
  },
})
