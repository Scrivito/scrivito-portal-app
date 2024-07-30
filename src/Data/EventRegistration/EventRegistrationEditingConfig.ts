import { provideEditingConfig } from 'scrivito'
import { EventRegistration } from './EventRegistrationDataClass'

provideEditingConfig(EventRegistration, {
  title: 'Event registration',
  attributes: {
    eventId: { title: 'Event ID' },
  },
})
