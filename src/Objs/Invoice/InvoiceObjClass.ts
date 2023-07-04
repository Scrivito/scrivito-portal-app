import * as Scrivito from 'scrivito'

export const Invoice = Scrivito.provideObjClass('Invoice', {
  attributes: {
    content: 'string',
    createdAt: 'string',
    customerAddress: 'string',
    customerId: 'string',
    invoiceId: 'string',
    issuerAddress: 'string',
    orderId: 'string',
    payment: 'string',
    pdfDownloadUrl: 'string',
    total: 'string',
  },
})
