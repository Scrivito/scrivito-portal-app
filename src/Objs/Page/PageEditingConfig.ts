import * as Scrivito from 'scrivito'
import { Page } from './PageObjClass'

Scrivito.provideEditingConfig(Page, {
  title: 'Page',
  attributes: {
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    linkIcon: {
      title: 'Link icon name',
      description:
        'This icon is shown e.g. when linked from the "portal" section of the navigation widget. The full list of names can be found at https://icons.getbootstrap.com/',
    },
    showTopContentSection: {
      title: 'Show top content section?',
      description:
        'This section will be visible before the regular content and a potential sub-navigation',
    },
    title: { title: 'Title' },
  },
  properties: [
    'title',
    'hideInNavigation',
    'linkIcon',
    'showTopContentSection',
  ],
})
