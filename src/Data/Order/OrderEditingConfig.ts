import { provideEditingConfig } from 'scrivito'
import { Order } from './OrderDataClass'

provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    keyword: { title: 'Keyword' },
    number: { title: 'Number' },
    type: { title: 'Type (code)' },
    status: { title: 'Status (code)' },
    mainStatus: { title: 'Main status (code)' },
    open: { title: 'Open?' },
    description: { title: 'Description' },
    totalPrice: { title: 'Total price' },
    totalPriceCurrency: { title: 'Total price currency' },
    termsOfPayment: { title: 'Terms of payment (code)' },
    termsOfDelivery: { title: 'Terms of delivery (code)' },
    customer: { title: 'Customer' },
    commercialAgent: { title: 'Commercial agent (ID)' },
    salesPartner: { title: 'Sales partner' },
    technicalAgent: { title: 'Technical agent (ID)' },
    quoteAt: { title: 'Quote at' },
    orderAt: { title: 'Order at' },
    deliveryAt: { title: 'Delivery at' },
  },
})
