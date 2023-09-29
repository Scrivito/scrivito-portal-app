import { provideEditingConfig } from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(SubnavigationOverview, {
  title: 'Subnavigation Overview',
  thumbnail: classNameToThumbnail('SubnavigationOverview'),
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
    requireUserLogin: {
      title: 'Require user login?',
      description:
        'Requires a user to be logged in for this page and all sub-pages',
    },
  },
  properties: [
    'title',
    'hideInNavigation',
    'linkIcon',
    'showTopContentSection',
    'requireUserLogin',
  ],
})
