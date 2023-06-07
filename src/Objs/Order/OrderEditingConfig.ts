import * as Scrivito from 'scrivito'
import { Order } from './OrderObjClass'

Scrivito.provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    billingAddress: { title: 'Billing address' },
    items: { title: 'Items' },
    orderDate: { title: 'Order date' },
    orderId: { title: 'Order ID' },
    orderTotal: { title: 'Order total' },
    payment: { title: 'Payment' },
    salesRepresentative: { title: 'Sales representative' },
    shippingId: { title: 'Shipping ID' },
  },
  properties: [
    'billingAddress',
    'items',
    'orderDate',
    'orderId',
    'orderTotal',
    'payment',
    'salesRepresentative',
    'shippingId',
  ],
  titleForContent: (obj) => `#${obj.get('orderId')}: ${obj.get('items')}`,
  hideInSelectionDialogs: true,
})
