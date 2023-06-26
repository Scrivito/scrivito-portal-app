import * as Scrivito from 'scrivito'

export const Order = Scrivito.provideObjClass('Order', {
  attributes: {
    billingAddress: 'string',
    createdAt: 'string',
    items: 'string',
    orderId: 'string',
    payment: 'string',
    pdfDownloadUrl: 'string',
    shippingId: 'string',
    total: 'string',
  },
})
