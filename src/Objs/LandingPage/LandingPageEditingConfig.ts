import { provideEditingConfig } from 'scrivito'
import { LandingPage } from './LandingPageObjClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(LandingPage, {
  title: 'Landing Page',
  thumbnail,
  attributes: {
    excludeFromSearch: {
      title: 'Exclude from search results?',
      description:
        'If checked, this download will not be included in search results.',
    },
    hideInNavigation: {
      title: 'Hide in navigation?',
    },
    metaDataDescription: {
      title: 'Page description',
      description: 'Limit to 175, ideally 150 characters.',
    },
    title: { title: 'Title' },
  },
  properties: [
    'title',
    'metaDataDescription',
    'hideInNavigation',
    'excludeFromSearch',
  ],
  initialContent: {
    hideInNavigation: true,
    excludeFromSearch: true,
  },
})
