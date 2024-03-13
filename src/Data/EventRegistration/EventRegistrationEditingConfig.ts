import { provideEditingConfig } from 'scrivito'
import { EventRegistration } from './EventRegistrationDataClass'

provideEditingConfig(EventRegistration, {
  title: 'Event Registration',
  attributes: {
    eventId: { title: 'Event ID' },
  },
})
