import { provideEditingConfig } from 'scrivito'
import { DeliveryAddress } from './DeliveryAddressObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(DeliveryAddress, {
  title: 'Delivery Address',
  thumbnail: classNameToThumbnail('DeliveryAddress'),
  attributes: {
    recipientName: { title: 'Recipient name' },
    streetAddress: { title: 'Street address' },
    city: { title: 'City' },
    postalCode: {
      title: 'Postal code',
      description: 'The postal code or ZIP code',
    },
    country: { title: 'Country' },
    phone: {
      title: 'Phone',
      description:
        "The recipient's contact number, which can be used for delivery inquiries.",
    },
    specialInstructions: {
      title: 'Special instructions',
      description: 'Any additional delivery instructions or notes.',
      options: { multiLine: true },
    },
  },
  properties: [
    'recipientName',
    'streetAddress',
    'city',
    'postalCode',
    'country',
    'phone',
    'specialInstructions',
  ],
  hideInSelectionDialogs: true,
  titleForContent: (obj) =>
    `${obj.get('recipientName')}: ${obj.get('streetAddress')}, ${obj.get(
      'postalCode',
    )} ${obj.get('city')}`,
})
