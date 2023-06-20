import * as Scrivito from 'scrivito'
import { CurrentUserDataItem } from './CurrentUserDataItem'

Scrivito.provideEditingConfig(CurrentUserDataItem, {
  title: 'Current user',
  attributes: {
    name: { title: 'Name' },
    email: { title: 'Email' },
    address: { title: 'Address' },
    telephone: { title: 'Telephone' },
    jobTitle: { title: 'Job title' },
  },
})
