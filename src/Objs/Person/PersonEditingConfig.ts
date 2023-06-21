import * as Scrivito from 'scrivito'
import { Person } from './PersonObjClass'

Scrivito.provideEditingConfig(Person, {
  title: 'Person',
  attributes: {
    email: { title: 'Email' },
    fax: { title: 'Fax' },
    image: { title: 'Image' },
    jobTitle: { title: 'Job title' },
    name: { title: 'Name' },
    telephone: { title: 'Telephone' },
  },
  thumbnailForContent: (obj) => obj.get('image'),
  properties: ['name', 'email', 'telephone', 'fax', 'jobTitle', 'image'],
  titleForContent: (obj) => obj.get('name'),
})
