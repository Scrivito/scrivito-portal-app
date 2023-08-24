import { provideEditingConfig } from 'scrivito'
import { Order } from './OrderObjClass'

provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    billingAddress: {
      title: 'Billing address',
      options: { multiLine: true },
    },
    createdAt: { title: 'Order created at', description: 'Format: YYYY-MM-DD' },
    customerId: { title: 'Customer ID' },
    items: {
      title: 'Items',
      options: { multiLine: true },
    },
    orderId: { title: 'Order ID' },
    payment: {
      title: 'Payment',
      description: '"advance payment", "cash", "credit card" or "invoice"',
    },
    pdfDownloadUrl: { title: 'PDF download URL' },
    shippingId: { title: 'Shipping ID' },
    total: { title: 'Total', description: 'Example: €123.00' },
  },
  properties: [
    'orderId',
    'customerId',
    'createdAt',
    'items',
    'billingAddress',
    'total',
    'payment',
    'shippingId',
    'pdfDownloadUrl',
  ],
  titleForContent: (obj) => `#${obj.get('orderId')}: ${obj.get('items')}`,
  hideInSelectionDialogs: true,
})
