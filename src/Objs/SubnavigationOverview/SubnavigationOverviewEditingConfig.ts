import * as Scrivito from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'

Scrivito.provideEditingConfig(SubnavigationOverview, {
  title: 'Subnavigation overview',
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
    title: { title: 'Title' },
    showTopContentSection: {
      title: 'Show top content section?',
      description:
        'This section will be visible before the regular content and a potential sub-navigation',
    },
  },
  properties: [
    'title',
    'hideInNavigation',
    'linkIcon',
    'showTopContentSection',
  ],
})
