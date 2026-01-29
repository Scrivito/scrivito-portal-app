import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const AddressWidget = provideWidgetClass('AddressWidget', {
  attributes: {
    showLogo: 'boolean',

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
    ...paddingAttributes,
    ...textStyleAttributes,
  },
  extractTextAttributes: [
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
