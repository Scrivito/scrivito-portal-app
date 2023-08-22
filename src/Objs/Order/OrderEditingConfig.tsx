import { provideEditingConfig } from 'scrivito'
import { Order } from './OrderObjClass'
import { MultilineStringEditor } from '../../Components/MultilineStringEditor'

provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    billingAddress: { title: 'Billing address' },
    createdAt: { title: 'Order created at', description: 'Format: YYYY-MM-DD' },
    customerId: { title: 'Customer ID' },
    items: { title: 'Items' },
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
    'total',
    'payment',
    'shippingId',
    'pdfDownloadUrl',
  ],
  propertiesGroups: [
    {
      title: 'Multiline attributes',
      key: 'order-multiline-attributes',

      // Cast is a working around for issue #9925
      // TODO: remove work around
      component: (({ obj }: { obj: InstanceType<typeof Order> }) => (
        <>
          <MultilineStringEditor
            content={obj}
            attribute="items"
            title="Items"
          />
          <MultilineStringEditor
            content={obj}
            attribute="billingAddress"
            title="Billing address"
          />
        </>
      )) as unknown as null,
    },
  ],

  titleForContent: (obj) => `#${obj.get('orderId')}: ${obj.get('items')}`,
  hideInSelectionDialogs: true,
})
