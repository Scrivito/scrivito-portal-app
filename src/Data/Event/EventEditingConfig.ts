import { provideEditingConfig } from 'scrivito'
import { Event } from './EventDataClass'

provideEditingConfig(Event, {
  title: 'Event',
  attributes: {
    logo: { title: 'Logo' },

    // TODO: Remove the following attributes, once #11338 is resolved:
    attendanceFee: { title: 'Attendance fee' },
    beginsAt: { title: 'Begins  at' },
    description: { title: 'Description' },
    endsAt: { title: 'Ends at' },
    freeSeats: { title: 'Free seats' },
    keyword: { title: 'Keyword' },
    language: { title: 'Language' },
    location: { title: 'Location' },
    number: { title: 'Number' },
    organizer: { title: 'Organizer' },
    responsibleAgent: { title: 'Responsible agent' },
    status: { title: 'Status' },
    url: { title: 'URL' },
  },
})
