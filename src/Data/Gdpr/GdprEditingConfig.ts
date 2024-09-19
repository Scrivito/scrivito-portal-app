import { provideEditingConfig } from 'scrivito'
import { Gdpr } from './GdprDataClass'

provideEditingConfig(Gdpr, {
  title: 'GDPR consent',
  attributes: {
    active: { title: 'Active?' },
  },
})
