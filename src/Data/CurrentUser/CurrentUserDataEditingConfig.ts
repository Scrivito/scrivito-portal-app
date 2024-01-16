import { provideEditingConfig } from 'scrivito'
import { CurrentUser } from './CurrentUserDataItem'

provideEditingConfig(CurrentUser, {
  title: 'Current user',
  attributes: {
    name: { title: 'Name' },
    email: { title: 'Email' },
    picture: { title: 'Picture' },
    jrUserId: { title: 'JustRelate user ID' },
    company: { title: 'Company' },
    phoneNumber: { title: 'Phone number' },
    salutation: { title: 'Salutation' },
  },
})
