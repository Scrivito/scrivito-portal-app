import { provideEditingConfig } from 'scrivito'
import { Order } from './OrderDataClass'

provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    commercialAgent: { title: 'Commercial agent ID' },
    technicalAgent: { title: 'Technical agent ID' },
  },
})
