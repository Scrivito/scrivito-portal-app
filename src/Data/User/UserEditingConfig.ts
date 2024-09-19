import { provideEditingConfig } from 'scrivito'
import { User } from './UserDataClass'

provideEditingConfig(User, {
  title: 'User',
  attributes: {
    image: { title: 'Image' },
    staff: { title: 'Staff?' },
  },
})
