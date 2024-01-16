import { provideEditingConfig } from 'scrivito'
import { Person } from './PersonObjClass'

provideEditingConfig(Person, {
  title: 'Person',
  attributes: {
    email: { title: 'Email' },
    employeeId: { title: 'Employee ID' },
    fax: { title: 'Fax' },
    image: { title: 'Image' },
    jobTitle: { title: 'Job title' },
    name: { title: 'Name' },
    telephone: { title: 'Telephone' },
  },
  thumbnailForContent: (obj) => obj.get('image'),
  properties: [
    'name',
    'email',
    'telephone',
    'fax',
    'jobTitle',
    'image',
    'employeeId',
  ],
  titleForContent: (obj) => obj.get('name'),
  hideInSelectionDialogs: true,
})
