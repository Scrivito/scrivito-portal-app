import { provideEditingConfig } from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SubnavigationOverview, {
  title: 'Subnavigation Overview',
  thumbnail: Thumbnail,
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
    requireUserLogin: {
      title: 'Require user login?',
      description:
        'Requires a user to be logged in for this page and all sub-pages',
    },
    topBannerBackground: {
      title: 'Top banner background',
      description:
        'This background will be shown on this page and all sub-pages',
    },
  },
  properties: [
    'title',
    'hideInNavigation',
    'linkIcon',
    'topBannerBackground',
    'requireUserLogin',
  ],
})
