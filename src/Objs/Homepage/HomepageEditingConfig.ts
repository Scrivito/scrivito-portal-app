import * as Scrivito from 'scrivito'
import { Homepage } from './HomepageObjClass'

// @ts-expect-error scrivito-sam
import { assistPopertiesGroup } from 'scrivito-sam'

Scrivito.provideEditingConfig(Homepage, {
  title: 'Homepage',
  attributes: {
    contentTitle: {
      title: 'Site name',
    },
    siteLogoDark: {
      title: 'Dark logo',
      description: 'Used with light backgrounds',
    },
    siteLogoLight: {
      title: 'Light logo',
      description: 'Used with dark backgrounds',
    },
    siteFavicon: {
      title: 'Favicon',
    },
    title: { title: 'Title' },
  },
  propertiesGroups: [
    {
      title: 'Site settings',
      properties: [
        'contentTitle',
        'siteLogoDark',
        'siteLogoLight',
        'siteFavicon',
      ],
      key: 'site-settings-group',
    },
    assistPopertiesGroup,
  ],
  properties: ['title'],
})
