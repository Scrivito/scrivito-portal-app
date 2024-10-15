import { provideEditingConfig } from 'scrivito'
import { Event } from './EventDataClass'

provideEditingConfig(Event, {
  title: 'Event',
  attributes: {
    logo: { title: 'Logo' },
  },
})
