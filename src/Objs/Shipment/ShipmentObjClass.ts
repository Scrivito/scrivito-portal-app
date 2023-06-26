import * as Scrivito from 'scrivito'

export const Shipment = Scrivito.provideObjClass('Shipment', {
  attributes: {
    carrier: 'string',
    carrierTrackingNumber: 'string',
    deliveryConfirmation: 'string',
    dimensions: 'string',
    from: 'string',
    orderId: 'string',
    pdfDownloadUrl: 'string',
    scheduledDate: 'string',
    shipmentId: 'string',
    status: 'string',
    to: 'string',
    weight: 'string',
  },
})
