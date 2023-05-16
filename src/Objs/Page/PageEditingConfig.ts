import * as Scrivito from 'scrivito'
import { Page } from './PageObjClass'

Scrivito.provideEditingConfig(Page, {
  title: 'Page',
  attributes: {
    title: { title: 'Title' },
  },
  properties: ['title'],
})
