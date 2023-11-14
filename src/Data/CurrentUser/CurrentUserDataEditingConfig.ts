import { provideEditingConfig } from 'scrivito'
import { CurrentUserDataItem } from './CurrentUserDataItem'

provideEditingConfig(CurrentUserDataItem, {
  title: 'Current user',
  attributes: {
    company: { title: 'Company' },
    email: { title: 'Email' },
    jrUserId: { title: 'JustRelate user ID' },
    name: { title: 'Name' },
    phoneNumber: { title: 'Phone number' },
    picture: { title: 'Picture' },
    salutation: { title: 'Salutation' },
  },
})
