import { provideEditingConfig } from 'scrivito'
import { User } from './UserDataClass'

provideEditingConfig(User, {
  title: 'User',
  attributes: {
    image: { title: 'Image' },

    // TODO: Remove the following attributes, once #11338 is resolved:
    email: { title: 'Email address' },
    familyName: { title: 'Family name' },
    givenName: { title: 'Given name' },
    name: { title: 'Name' },
    position: { title: 'Position' },
    salutation: { title: 'Saluation' },
    staff: { title: 'Internal staff?' },
  },
})
