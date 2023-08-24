import { provideEditingConfig } from 'scrivito'
import { Quote } from './QuoteObjClass'

provideEditingConfig(Quote, {
  title: 'Quote',
  attributes: {
    comments: { title: 'Comments' },
    content: {
      title: 'Content',
      options: { multiLine: true },
    },
    createdAt: { title: 'Quote created at', description: 'Format: YYYY-MM-DD' },
    customerId: { title: 'Customer ID' },
    payment: {
      title: 'Payment',
      description: '"advance payment", "cash", "credit card" or "invoice"',
    },
    pdfDownloadUrl: { title: 'PDF download URL' },
    quoteId: { title: 'Quote ID' },
    status: {
      title: 'Status',
      description:
        '"sent", "accepted", "rejected", "expired", "revised", "closed" or "cancelled"',
    },
    termsAndConditions: { title: 'Terms and conditions' },
    total: { title: 'Total', description: 'Example: €123.00' },
    validUntil: {
      title: 'Valid until',
      description: 'Format: YYYY-MM-DD',
    },
  },
  properties: [
    'quoteId',
    'customerId',
    'createdAt',
    'validUntil',
    'content',
    'payment',
    'total',
    'status',
    'comments',
    'termsAndConditions',
    'pdfDownloadUrl',
  ],
  titleForContent: (obj) => `#${obj.get('quoteId')}: ${obj.get('content')}`,
  hideInSelectionDialogs: true,
})
