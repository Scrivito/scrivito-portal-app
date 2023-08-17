import { provideObjClass } from 'scrivito'

export const Person = provideObjClass('Person', {
  attributes: {
    email: 'string',
    employeeId: 'string',
    fax: 'string',
    image: ['reference', { only: ['Image'] }],
    jobTitle: 'string',
    name: 'string',
    telephone: 'string',
  },
})
