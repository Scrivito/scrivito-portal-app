import * as Scrivito from 'scrivito'

export const Shipment = Scrivito.provideObjClass('Shipment', {
  attributes: {
    carrier: 'string', // The name of the shipping carrier or logistics provider responsible for transporting the shipment.
    carrierTrackingNumber: 'string',
    deliveryConfirmation: 'string', // An indicator that shows whether the shipment requires a signature or proof of delivery upon receipt.
    dimensions: 'string',
    orderId: 'string',
    shipmentDate: 'string', // The date when the shipment is scheduled to be sent or has been sent.
    shipmentId: 'string',
    shipmentStatus: 'string', // "In Transit," "Delivered," "Delayed," or "Cancelled."
    shippedFrom: 'string', // Location of sender
    shippedTo: 'string', // Location of receiver
    weight: 'string',
  },
})
