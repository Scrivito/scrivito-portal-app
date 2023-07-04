import * as Scrivito from 'scrivito'
import { Invoice } from './InvoiceObjClass'
import { MultilineStringEditor } from '../../Components/MultilineStringEditor'

Scrivito.provideEditingConfig(Invoice, {
  title: 'Invoice',
  attributes: {
    content: { title: 'Content' },
    createdAt: {
      title: 'Invoice created at',
      description: 'Format: YYYY-MM-DD',
    },
    customerAddress: { title: 'Customer address' },
    customerId: { title: 'Customer ID' },
    invoiceId: { title: 'Invoice ID' },
    issuerAddress: { title: 'Issuer address' },
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
    'total',
    'payment',
    'pdfDownloadUrl',
  ],
  propertiesGroups: [
    {
      title: 'Multiline attributes',
      key: 'invoice-multiline-attributes',

      // Cast is a working around for issue #9925
      // TODO: remove work around
      component: (({ obj }: { obj: InstanceType<typeof Invoice> }) => (
        <>
          <MultilineStringEditor
            content={obj}
            attribute="content"
            title="Content"
          />
          <MultilineStringEditor
            content={obj}
            attribute="issuerAddress"
            title="Issuer address"
          />
          <MultilineStringEditor
            content={obj}
            attribute="customerAddress"
            title="Customer address"
          />
        </>
      )) as unknown as null,
    },
  ],
  titleForContent: (obj) => `#${obj.get('invoiceId')}: ${obj.get('content')}`,
  hideInSelectionDialogs: true,
})
