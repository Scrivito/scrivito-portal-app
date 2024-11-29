import { provideEditingConfig } from 'scrivito'
import { OrderRequest } from './OrderRequestDataClass'

provideEditingConfig(OrderRequest, {
  title: 'Order request',
})
