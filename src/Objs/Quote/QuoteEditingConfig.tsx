import { provideEditingConfig } from 'scrivito'
import { MultilineStringEditor } from '../../Components/MultilineStringEditor'
import { Quote } from './QuoteObjClass'

provideEditingConfig(Quote, {
  title: 'Quote',
  attributes: {
    comments: { title: 'Comments' },
    content: { title: 'Content' },
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
    'payment',
    'total',
    'status',
    'comments',
    'termsAndConditions',
    'pdfDownloadUrl',
  ],
  propertiesGroups: [
    {
      title: 'Multiline attributes',
      key: 'quote-multiline-attributes',

      // Cast is a working around for issue #9925
      // TODO: remove work around
      component: (({ obj }: { obj: InstanceType<typeof Quote> }) => (
        <>
          <MultilineStringEditor
            content={obj}
            attribute="content"
            title="Content"
          />
        </>
      )) as unknown as null,
    },
  ],

  titleForContent: (obj) => `#${obj.get('quoteId')}: ${obj.get('content')}`,
  hideInSelectionDialogs: true,
})
