import { provideEditingConfig } from 'scrivito'
import { Gdpr } from './GdprDataClass'

provideEditingConfig(Gdpr, {
  title: 'GDPR consent',
  attributes: {
    name: { title: 'Name' },
    description: { title: 'Description' },
    active: { title: 'Active?' },
  },
})
