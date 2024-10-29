import { provideEditingConfig } from 'scrivito'
import { Order } from './OrderDataClass'

provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    commercialAgent: { title: 'Commercial agent' },
    customer: { title: 'Customer' },
    deliveryAt: { title: 'Delivery date' },
    description: { title: 'Description' },
    keyword: { title: 'Keyword' },
    mainStatus: { title: 'Main status' },
    number: { title: 'Number' },
    open: { title: 'Open?' },
    orderAt: { title: 'Order at' },
    quoteAt: { title: 'Quote at' },
    salesPartner: { title: 'Sales partner' },
    status: { title: 'Status' },
    technicalAgent: { title: 'Technical agent' },
    termsOfDelivery: { title: 'Terms of delivery' },
    termsOfPayment: { title: 'Terms of payment' },
    totalPrice: { title: 'Revenue' },
    totalPriceCurrency: { title: 'Currency' },
    type: { title: 'Type' },
    url: { title: 'URL' },
  },
})
