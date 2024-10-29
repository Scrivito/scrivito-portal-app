import { provideEditingConfig } from 'scrivito'
import { Gdpr } from './GdprDataClass'

provideEditingConfig(Gdpr, {
  title: 'GDPR consent',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    active: { title: 'Active?' },
    description: { title: 'Description' },
    name: { title: 'Name' },
  },
})
