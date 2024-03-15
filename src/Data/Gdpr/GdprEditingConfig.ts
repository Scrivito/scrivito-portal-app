import { provideEditingConfig } from 'scrivito'
import { Gdpr } from './GdprDataClass'

provideEditingConfig(Gdpr, {
  title: 'GDPR',
  attributes: {
    name: { title: 'Name' },
    description: { title: 'Description' },
    active: { title: 'Active?' },
  },
})
