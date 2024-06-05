import { provideEditingConfig } from 'scrivito'
import { User } from './UserDataClass'

provideEditingConfig(User, {
  title: 'User',
  attributes: {
    _id: { title: 'User ID' },
    name: { title: 'Name (given and family name)' },
    email: { title: 'Email' },
    position: { title: 'Position' },
    image: { title: 'Image' },
    staff: { title: 'Staff?' },
    salutation: { title: 'Salutation' },
    givenName: { title: 'Given name' },
    familyName: { title: 'Family name' },
  },
})
