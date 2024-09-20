import { provideEditingConfig } from 'scrivito'
import { ServiceObject } from './ServiceObjectDataClass'

provideEditingConfig(ServiceObject, {
  title: 'Service object',
  attributes: {
    isCarrier: { title: 'Is carrier?' },
    isCustomer: { title: 'Is customer?' },
    isSupplier: { title: 'Is supplier?' },
    parentId: { title: 'Parent service object ID' },
    picture: { title: 'Picture' },
    responsibleAgent: { title: 'Responsible agent ID' },
  },
})
