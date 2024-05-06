import { provideEditingConfig } from 'scrivito'
import { Gdpr } from './GdprDataClass'

provideEditingConfig(Gdpr, {
  title: 'GDPR consent',
  attributes: {
    _id: { title: 'GDPR consent ID' },
    name: { title: 'Name' },
    description: { title: 'Description' },
    active: { title: 'Active?' },
  },
})
