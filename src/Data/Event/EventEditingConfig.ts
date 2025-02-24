import { provideEditingConfig } from 'scrivito'
import { Event } from './EventDataClass'

provideEditingConfig(Event, {
  attributes: {
    logo: { title: 'Logo' },
  },
})
