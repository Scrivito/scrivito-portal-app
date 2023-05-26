import * as Scrivito from 'scrivito'
import { Page } from './PageObjClass'

Scrivito.provideEditingConfig(Page, {
  title: 'Page',
  attributes: {
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
    linkIcon: {
      title: 'Link icon name',
      description:
        'This icon is shown e.g. when linked from the "portal" section of the navigation widget. The full list of names can be found at https://icons.getbootstrap.com/',
    },
  },
  properties: ['title', 'hideInNavigation', 'linkIcon'],
})
