import * as Scrivito from 'scrivito'
import { Homepage } from './HomepageObjClass'

Scrivito.provideEditingConfig(Homepage, {
  title: 'Homepage',
  attributes: {
    title: { title: 'Title' },
  },
  properties: ['title'],
})
