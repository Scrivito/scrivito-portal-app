import { provideWidgetClass } from 'scrivito'

export const AddressWidget = provideWidgetClass('AddressWidget', {
  attributes: {
    showLogo: 'boolean',

    locationName: 'string',
    locationStreetAddress: 'string',
    locationLocality: 'string',
    locationPostalCode: 'string',
    locationRegion: 'string',
    locationCountry: 'string',
    addressFormat: ['enum', { values: ['USA', 'GER'] }],

    phone: 'string',
    fax: 'string',
    email: 'string',
  },
  extractTextAttributes: [
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
})
