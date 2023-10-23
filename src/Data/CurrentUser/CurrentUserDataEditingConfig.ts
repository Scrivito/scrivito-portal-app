import { provideEditingConfig } from 'scrivito'
import { CurrentUserDataItem } from './CurrentUserDataItem'

provideEditingConfig(CurrentUserDataItem, {
  title: 'Current user',
  attributes: {
    name: { title: 'Name' },
    email: { title: 'Email' },
    jrUserId: { title: 'JustRelate user ID' },
    company: { title: 'Company' },
    phoneNumber: { title: 'Phone number' },
    salutation: { title: 'Salutation' },
  },
})
