import { provideEditingConfig } from 'scrivito'
import { Event } from './EventDataClass'

provideEditingConfig(Event, {
  title: 'Event',
  attributes: {
    keyword: { title: 'Keyword' },
    number: { title: 'Number' },
    beginsAt: { title: 'Begins at' },
    endsAt: { title: 'Ends at' },
    location: { title: 'Location' },
    organizer: { title: 'Organizer' },
    responsibleAgent: { title: 'Responsible agent (ID)' },
    status: { title: 'Status (code)' },
    statusLocalized: { title: 'Status (human readable)' },
    url: { title: 'URL' },
    logo: { title: 'Logo' },
    language: { title: 'Language (code)' },
    languageLocalized: { title: 'Language (human readable)' },
    freeSeats: { title: 'Free seats' },
    attendanceFee: { title: 'Attendance fee' },
    description: { title: 'Description' },
  },
})
