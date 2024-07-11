import { provideEditingConfig } from 'scrivito'
import { AddressWidget } from './AddressWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(AddressWidget, {
  title: 'Address',
  thumbnail: Thumbnail,
  attributes: {
    showLogo: {
      title: 'Show brand logo?',
      description: 'Default: Yes',
    },
    brandName: {
      title: 'Brand name',
    },
    locationName: {
      title: 'Location name',
      description: 'E.g. New York Convention Center',
    },
    locationStreetAddress: {
      title: 'Street address',
      description: 'E.g. 655 W. 34th Street',
    },
    locationLocality: {
      title: 'Locality',
      description: 'E.g. New York',
    },
    locationRegion: {
      title: 'Region',
      description: 'E.g. NY or CA',
    },
    locationPostalCode: {
      title: 'Postal code',
      description: 'E.g. 10001',
    },
    locationCountry: {
      title: 'Country',
      description: 'E.g. USA',
    },
    phone: {
      title: 'Phone',
    },
    fax: {
      title: 'Fax',
    },
    email: {
      title: 'Email',
    },
  },
  properties: [
    'showLogo',
    'brandName',
    'locationName',
    'locationStreetAddress',
    'locationLocality',
    'locationPostalCode',
    'locationRegion',
    'locationCountry',
    'phone',
    'fax',
    'email',
  ],
  initialContent: {
    showLogo: true,
    phoneLabel: 'Phone',
    faxLabel: 'Fax',
    emailLabel: 'Email',
  },
})
