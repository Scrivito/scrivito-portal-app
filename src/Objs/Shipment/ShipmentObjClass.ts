import * as Scrivito from 'scrivito'

export const Shipment = Scrivito.provideObjClass('Shipment', {
  attributes: {
    carrier: 'string',
    carrierTrackingNumber: 'string',
    deliveryConfirmation: 'string',
    dimensions: 'string',
    orderId: 'string',
    pdfDownloadUrl: 'string',
    shipmentDate: 'string',
    shipmentId: 'string',
    shipmentStatus: 'string',
    shippedFrom: 'string',
    shippedTo: 'string',
    weight: 'string',
  },
})
