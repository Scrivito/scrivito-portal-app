import { provideObjClass } from 'scrivito'

export const DeliveryAddress = provideObjClass('DeliveryAddress', {
  attributes: {
    recipientName: 'string',
    streetAddress: 'string',
    city: 'string',
    postalCode: 'string',
    country: 'string',
    phone: 'string',
    specialInstructions: 'string',
  },
})
