import { provideEditingConfig } from 'scrivito'
import { ServiceObject } from './ServiceObjectDataClass'

provideEditingConfig(ServiceObject, {
  title: 'Service object',
  attributes: {
    parentId: { title: 'Parent service object ID' },
    picture: { title: 'Picture' },
    responsibleAgent: { title: 'Responsible agent ID' },
  },
})
