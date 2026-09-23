import { provideEditingConfig } from 'scrivito'
import { User } from './UserDataClass'

provideEditingConfig(User, {
  attributes: {
    image: { title: 'Image' },
  },
})
