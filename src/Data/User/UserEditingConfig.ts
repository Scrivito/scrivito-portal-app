import { provideEditingConfig } from 'scrivito'
import { User } from './UserDataClass'

provideEditingConfig(User, {
  title: 'User',
  attributes: {
    name: { title: 'Name (given and family name)' },
    salutation: { title: 'Salutation' },
    givenName: { title: 'Given name' },
    familyName: { title: 'Family name' },
  },
})
