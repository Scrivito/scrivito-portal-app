import { provideEditingConfig } from 'scrivito'
import { EventRegistrationPromise } from './EventRegistrationDataClass'

EventRegistrationPromise.then((EventRegistration) => {
  provideEditingConfig(EventRegistration, {
    title: 'Event registration',
    attributes: {
      eventId: { title: 'Event ID' },
    },
  })
})
