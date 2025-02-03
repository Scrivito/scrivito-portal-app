import { provideEditingConfig } from 'scrivito'
import { ServiceObject } from './ServiceObjectDataClass'

provideEditingConfig(ServiceObject, {
  attributes: {
    picture: { title: 'Picture' },
  },
})
