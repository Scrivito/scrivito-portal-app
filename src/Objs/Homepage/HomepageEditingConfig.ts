import * as Scrivito from 'scrivito'
import { Homepage } from './HomepageObjClass'

Scrivito.provideEditingConfig(Homepage, {
  title: 'Homepage',
  attributes: {
    siteLogoDark: {
      title: 'Dark logo',
      description: 'Used with light backgrounds',
    },
    siteLogoLight: {
      title: 'Light logo',
      description: 'Used with dark backgrounds',
    },
    title: { title: 'Title' },
  },
  propertiesGroups: [
    {
      title: 'Site settings',
      properties: ['siteLogoDark', 'siteLogoLight'],
      key: 'site-settings-group',
    },
  ],
  properties: ['title'],
})
