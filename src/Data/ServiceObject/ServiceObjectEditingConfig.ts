import { provideEditingConfig } from 'scrivito'
import { ServiceObject } from './ServiceObjectDataClass'

provideEditingConfig(ServiceObject, {
  title: 'Service object',
  attributes: {
    picture: { title: 'Picture' },
  },
})
