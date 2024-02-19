import { provideEditingConfig } from 'scrivito'
import { CurrentUser } from './CurrentUserDataItem'

provideEditingConfig(CurrentUser, {
  title: 'Current user',
  attributes: {
    name: { title: 'Name' },
    email: { title: 'Email' },
    company: { title: 'Company' },
    phoneNumber: { title: 'Phone number' },
    salutation: { title: 'Salutation' },
    familyName: { title: 'Family name' },
    givenName: { title: 'Given name' },
    picture: { title: 'Picture' },
    jrUserId: { title: 'JustRelate user ID' },
    pisaUserId: { title: 'PisaSales user ID' },
  },
})
