import { provideEditingConfig } from 'scrivito'
import { EventPromise } from './EventDataClass'

EventPromise.then((Event) => {
  provideEditingConfig(Event, {
    title: 'Event',
    attributes: {
      _id: { title: 'Event ID' },
      keyword: { title: 'Keyword' },
      number: { title: 'Number' },
      beginsAt: { title: 'Begins at' },
      endsAt: { title: 'Ends at' },
      location: { title: 'Location' },
      organizer: { title: 'Organizer' },
      responsibleAgent: { title: 'Responsible agent (ID)' },
      status: { title: 'Status' },
      url: { title: 'Website URL' },
      logo: { title: 'Logo' },
      language: { title: 'Language' },
      freeSeats: { title: 'Free seats' },
      attendanceFee: { title: 'Attendance fee' },
      description: { title: 'Description' },
    },
  })
})
