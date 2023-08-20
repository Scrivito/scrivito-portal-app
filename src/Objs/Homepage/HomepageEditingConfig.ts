// @ts-expect-error scrivito-sam
import { assistPopertiesGroup } from 'scrivito-sam'
import { provideEditingConfig } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideEditingConfig(Homepage, {
  title: 'Homepage',
  attributes: {
    contentTitle: {
      title: 'Site name',
    },
    baseUrl: {
      title: 'Base URL',
      description:
        'Under which URL is this site reachable? E.g. "https://www.tynacoon.com/en"',
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
        'baseUrl',
        'siteLogoDark',
        'siteLogoLight',
        'siteFavicon',
        'siteLanguageIcon',
        'sitePortalOnlyMode',
        'siteCartPage',
        'sitePortalOverviewPage',
        'siteSearchResultsPage',
        'siteUserProfilePage',
      ],
      key: 'site-settings-group',
    },
    assistPopertiesGroup,
  ],
  properties: ['title', 'metaDataDescription'],
})
