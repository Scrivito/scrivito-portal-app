import { provideEditingConfig } from 'scrivito'
import { EventRegistration } from './EventRegistrationDataClass'

provideEditingConfig(EventRegistration, {
  title: 'Event registration',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    eventId: { title: 'Event' },
  },
})
