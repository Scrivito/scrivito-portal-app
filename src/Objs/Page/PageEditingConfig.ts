import * as Scrivito from 'scrivito'
import { Page } from './PageObjClass'

Scrivito.provideEditingConfig(Page, {
  title: 'Page',
  attributes: {
    hideFromNavigation: {
      title: 'Hide from navigation?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'hideFromNavigation'],
})
