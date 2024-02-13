import { provideEditingConfig } from 'scrivito'
import { Order } from './OrderDataClass'

provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    keyword: { title: 'Keyword' },
    number: { title: 'Number' },
    type: { title: 'Type (enum)' },
    typeLocalized: { title: 'Type (localized)' },
    status: { title: 'Status (enum)' },
    statusLocalized: { title: 'Status (localized)' },
    mainStatus: { title: 'Main status (enum)' },
    mainStatusLocalized: { title: 'Main status (localized)' },
    open: { title: 'Open?' },
    description: { title: 'Description' },
    totalPrice: { title: 'Total price' },
    totalPriceCurrency: { title: 'Total price currency' },
    termsOfPayment: { title: 'Terms of payment (enum)' },
    termsOfPaymentLocalized: { title: 'Terms of payment (localized)' },
    termsOfDelivery: { title: 'Terms of delivery (enum)' },
    termsOfDeliveryLocalized: { title: 'Terms of delivery (localized)' },
    customer: { title: 'Customer' },
    commercialAgent: { title: 'Commercial agent (ID)' },
    salesPartner: { title: 'Sales partner' },
    technicalAgent: { title: 'Technical agent (ID)' },
    quoteAt: { title: 'Quote at' },
    orderAt: { title: 'Order at' },
    deliveryAt: { title: 'Delivery at' },
  },
})
