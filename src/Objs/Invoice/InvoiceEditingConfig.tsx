import { provideEditingConfig } from 'scrivito'
import { Invoice } from './InvoiceObjClass'

provideEditingConfig(Invoice, {
  title: 'Invoice',
  attributes: {
    content: {
      title: 'Content',
      options: { multiLine: true },
    },
    createdAt: {
      title: 'Invoice created at',
      description: 'Format: YYYY-MM-DD',
    },
    customerAddress: {
      title: 'Customer address',
      options: { multiLine: true },
    },
    customerId: { title: 'Customer ID' },
    invoiceId: { title: 'Invoice ID' },
    issuerAddress: {
      title: 'Issuer address',
      options: { multiLine: true },
    },
    orderId: { title: 'Order ID' },
    total: { title: 'Total', description: 'Example: €123.00' },
    payment: {
      title: 'Payment',
      description: '"advance payment", "cash", "credit card" or "invoice"',
    },
    pdfDownloadUrl: { title: 'PDF download URL' },
  },
  properties: [
    'invoiceId',
    'customerId',
    'orderId',
    'createdAt',
    'content',
    'issuerAddress',
    'customerAddress',
    'total',
    'payment',
    'pdfDownloadUrl',
  ],
  titleForContent: (obj) => `#${obj.get('invoiceId')}: ${obj.get('content')}`,
  hideInSelectionDialogs: true,
})
