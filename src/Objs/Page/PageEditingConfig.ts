// @ts-expect-error scrivito-sam
import { assistPopertiesGroup } from 'scrivito-sam'
import { provideEditingConfig } from 'scrivito'
import { Page } from './PageObjClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(Page, {
  title: 'Page',
  thumbnail: Thumbnail,
  attributes: {
    excludeFromSearch: {
      title: 'Exclude from search results?',
      description:
        'If checked, this download will not be included in search results.',
    },
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    linkIcon: {
      title: 'Link icon name',
      description:
        'This icon is shown e.g. when linked from the "portal" section of the navigation widget. The full list of names can be found at https://icons.getbootstrap.com/',
    },
    metaDataDescription: {
      title: 'Page description',
      description: 'Limit to 175, ideally 150 characters.',
    },
    showAsLandingPage: {
      title: 'Display this page as a landing page?',
      description:
        'Removes the header navigation and only centers the logo instead. Default: No',
    },
    title: { title: 'Title' },
  },
  properties: [
    'title',
    'metaDataDescription',
    'hideInNavigation',
    'linkIcon',
    'excludeFromSearch',
    'showAsLandingPage',
  ],
  propertiesGroups: [assistPopertiesGroup],
})
