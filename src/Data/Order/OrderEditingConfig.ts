import { provideEditingConfig } from 'scrivito'
import { Order } from './OrderDataClass'

provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    commercialAgent: { title: 'Commercial agent' },
    customer: { title: 'Customer' },
    deliveryAt: { title: 'Delivery at' },
    description: { title: 'Description' },
    keyword: { title: 'Keyword' },
    number: { title: 'Number' },
    orderAt: { title: 'Order at' },
    quoteAt: { title: 'Quote at' },
    salesPartner: { title: 'Sales partner' },
    status: { title: 'Status' },
    technicalAgent: { title: 'Technical agent' },
    termsOfDelivery: { title: 'Terms of delivery' },
    termsOfPayment: { title: 'Terms of payment' },
    totalPrice: { title: 'Total price' },
    type: { title: 'Type' },
  },
})
