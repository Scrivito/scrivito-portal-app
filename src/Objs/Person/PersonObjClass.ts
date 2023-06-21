import * as Scrivito from 'scrivito'

export const Person = Scrivito.provideObjClass('Person', {
  attributes: {
    email: 'string',
    fax: 'string',
    image: ['reference', { only: ['Image'] }],
    jobTitle: 'string',
    name: 'string',
    telephone: 'string',
  },
})
