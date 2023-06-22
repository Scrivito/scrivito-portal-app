import * as Scrivito from 'scrivito'

export const Order = Scrivito.provideObjClass('Order', {
  attributes: {
    billingAddress: 'string',
    items: 'string',
    orderDate: 'string',
    orderId: 'string',
    orderTotal: 'string',
    payment: 'string',
    pdfDownloadUrl: 'string',
    shippingId: 'string',
  },
})
