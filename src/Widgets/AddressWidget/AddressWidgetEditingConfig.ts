import { provideEditingConfig } from 'scrivito'
import { AddressWidget } from './AddressWidgetClass'
import Thumbnail from './thumbnail.svg'
import {
  textStyleEditingConfigAttributes,
  textStylePropertiesGroup,
} from '../textStyleEditingConfig'

provideEditingConfig(AddressWidget, {
  title: 'Address',
  thumbnail: Thumbnail,
  attributes: {
    showLogo: {
      title: 'Show brand logo?',
      description: 'Default: Yes',
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
    ...textStyleEditingConfigAttributes,
  },
  properties: [
    'showLogo',
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
  propertiesGroups: [textStylePropertiesGroup],
  initialContent: {
    showLogo: true,
    phoneLabel: 'Phone',
    faxLabel: 'Fax',
    emailLabel: 'Email',
  },
})
