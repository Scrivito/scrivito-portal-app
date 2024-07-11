import { provideWidgetClass } from 'scrivito'

export const AddressWidget = provideWidgetClass('AddressWidget', {
  attributes: {
    showLogo: 'boolean',
    brandName: 'string',

    locationName: 'string',
    locationStreetAddress: 'string',
    locationLocality: 'string',
    locationPostalCode: 'string',
    locationRegion: 'string',
    locationCountry: 'string',

    phone: 'string',
    phoneLabel: 'string',
    fax: 'string',
    faxLabel: 'string',
    email: 'string',
    emailLabel: 'string',
  },
  extractTextAttributes: [
    'brandName',
    'locationName',
    'locationStreetAddress',
    'locationLocality',
    'locationPostalCode',
    'locationRegion',
    'locationCountry',
    'phoneLabel',
    'phone',
    'faxLabel',
    'fax',
    'emailLabel',
    'email',
  ],
})

export type AddressWidgetInstance = InstanceType<typeof AddressWidget>
