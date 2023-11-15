import { provideEditingConfig } from 'scrivito'
import { Rocket } from './RocketDataClass'

provideEditingConfig(Rocket, {
  title: 'Rocket',
  attributes: {
    country: { title: 'Country' },
    description: { title: 'Description' },
    first_flight: { title: 'First flight' },
    id: { title: 'ID' },
    image: { title: 'Image URL' },
    name: { title: 'Name' },
    wikipedia: { title: 'Wikipedia URL' },
  },
})
