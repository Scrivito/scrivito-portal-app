import { provideEditingConfig } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideEditingConfig(Homepage, {
  title: 'Homepage',
  attributes: {
    contentTitle: {
      title: 'Site name',
    },
    metaDataDescription: {
      title: 'Page description',
      description: 'Limit to 175, ideally 150 characters.',
    },
    siteLanguageIcon: { title: 'Language icon' },
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
    sitePortalOnlyMode: { title: 'Use portal-only mode?' },
    siteCartPage: { title: 'Location of cart page' },
    sitePortalOverviewPage: { title: 'Location of portal overview page' },
    siteSearchResultsPage: {
      title: 'Location of search results page',
    },
    siteUserProfilePage: { title: 'Location of user profile page' },
  },
  propertiesGroups: [
    {
      title: 'Site settings',
      properties: [
        'contentTitle',
        'siteLogoDark',
        'siteLogoLight',
        'siteFavicon',
        'siteLanguageIcon',
        'sitePortalOnlyMode',
        'sitePortalOverviewPage',
        'siteSearchResultsPage',
        'siteUserProfilePage',
      ],
      key: 'site-settings-group',
    },
    {
      title: 'Shopping cart',
      properties: ['siteCartPage'],
      key: 'cart-settings-group',
    },
  ],
  properties: ['title', 'metaDataDescription'],
})
