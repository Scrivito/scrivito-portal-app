import * as Scrivito from 'scrivito'
import { Shipment } from './ShipmentObjClass'
import { MultilineStringEditor } from '../../Components/MultilineStringEditor'

Scrivito.provideEditingConfig(Shipment, {
  title: 'Shipment',
  attributes: {
    carrier: {
      title: 'Carrier',
      description:
        'The name of the shipping carrier or logistics provider responsible for transporting the shipment.',
    },
    carrierTrackingNumber: { title: 'Carrier tracking number' },
    deliveryConfirmation: {
      title: 'Delivery confirmation',
      description:
        'An indicator that shows whether the shipment requires a signature or proof of delivery upon receipt.',
    },
    dimensions: {
      title: 'Dimensions',
      description: 'E.g. "15 x 8.5 x 6 cm"',
    },
    orderId: { title: 'Order ID' },
    shipmentDate: {
      title: 'Shipment date',
      description:
        'The date when the shipment is scheduled to be sent or has been sent. Format: YYYY-MM-DD',
    },
    shipmentId: { title: 'Shipment ID' },
    shipmentStatus: {
      title: 'Shipment status',
      description:
        '"logged", "booked", "in transit", "delivered", "delayed" or "cancelled"',
    },
    shippedFrom: { title: 'Shipped from', description: 'Location of sender' },
    shippedTo: { title: 'Shipped to', description: 'Location of receiver' },
    weight: {
      title: 'Weight',
      description: 'E.g. "25.6 kg"',
    },
  },
  properties: [
    'shipmentId',
    'orderId',
    'shipmentDate',
    'shipmentStatus',
    'deliveryConfirmation',
    'carrier',
    'carrierTrackingNumber',
    'dimensions',
    'weight',
  ],
  propertiesGroups: [
    {
      title: 'Multiline attributes',
      key: 'multiline-attributes',

      // Cast is a working around for issue #9925
      // TODO: remove work around
      component: (({ obj }: { obj: InstanceType<typeof Shipment> }) => (
        <>
          <MultilineStringEditor
            content={obj}
            attribute="shippedFrom"
            title="Shipped from"
            description="Location of sender"
          />
          <MultilineStringEditor
            content={obj}
            attribute="shippedTo"
            title="Shipped to"
            description="Location of receiver"
          />
        </>
      )) as unknown as null,
    },
  ],
  titleForContent: (obj) =>
    `#${obj.get('shipmentId')}: ${obj.get('shipmentStatus')}`,
  hideInSelectionDialogs: true,
})
