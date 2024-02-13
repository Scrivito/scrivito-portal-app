import { provideEditingConfig } from 'scrivito'
import { Order } from './OrderDataClass'

provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    keyword: { title: 'Keyword' },
    number: { title: 'Number' },
    type: { title: 'Type (code)' },
    typeLocalized: { title: 'Type (human readable)' },
    status: { title: 'Status (code)' },
    statusLocalized: { title: 'Status (human readable)' },
    mainStatus: { title: 'Main status (code)' },
    mainStatusLocalized: { title: 'Main status (human readable)' },
    open: { title: 'Open?' },
    description: { title: 'Description' },
    totalPrice: { title: 'Total price' },
    totalPriceCurrency: { title: 'Total price currency' },
    termsOfPayment: { title: 'Terms of payment (code)' },
    termsOfPaymentLocalized: { title: 'Terms of payment (human readable)' },
    termsOfDelivery: { title: 'Terms of delivery (code)' },
    termsOfDeliveryLocalized: { title: 'Terms of delivery (human readable)' },
    customer: { title: 'Customer' },
    commercialAgent: { title: 'Commercial agent (ID)' },
    salesPartner: { title: 'Sales partner' },
    technicalAgent: { title: 'Technical agent (ID)' },
    quoteAt: { title: 'Quote at' },
    orderAt: { title: 'Order at' },
    deliveryAt: { title: 'Delivery at' },
  },
})
