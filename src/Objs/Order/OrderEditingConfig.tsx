import * as Scrivito from 'scrivito'
import { Order } from './OrderObjClass'
import { MultilineStringEditor } from '../../Components/MultilineStringEditor'

Scrivito.provideEditingConfig(Order, {
  title: 'Order',
  attributes: {
    billingAddress: { title: 'Billing address' },
    items: { title: 'Items' },
    orderDate: { title: 'Order date', description: 'Format: YYYY-MM-DD' },
    orderId: { title: 'Order ID' },
    orderTotal: { title: 'Order total', description: 'Example: €123.00' },
    payment: {
      title: 'Payment',
      description: '"advance payment", "cash", "credit card" or "invoice"',
    },
    shippingId: { title: 'Shipping ID' },
  },
  properties: ['orderId', 'orderDate', 'orderTotal', 'payment', 'shippingId'],
  propertiesGroups: [
    {
      title: 'Multiline attributes',
      key: 'multiline-attributes',

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
