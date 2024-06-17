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
    pisaUrl: {
      title: 'PisaSales Portal API URL',
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
  propertiesGroups: (site) => [
    {
      title: 'Site settings',
      properties: [
        'contentTitle',
        'baseUrl',
        site.siteId() === 'default' && site.path() === '/' ? 'pisaUrl' : null,
        'siteLogoDark',
        'siteLogoLight',
        'siteFavicon',
        'siteLanguageIcon',
        'sitePortalOnlyMode',
        'siteCartPage',
        'sitePortalOverviewPage',
        'siteSearchResultsPage',
        'siteUserProfilePage',
      ].filter((p): p is string => typeof p === 'string'),
      key: 'site-settings-group',
    },
    {
      title: 'Site color settings',
      properties: [
        'siteColorPrimary',
        'siteColorPrimaryLighten',
        'siteColorPrimaryDarken',
        'siteColorSecondary',
        'siteColorSecondaryLighten',
        'siteColorSecondaryDarken',
        'siteDropShadow',
      ],
      key: 'site-color-settings-group',
    },
  ],
  properties: ['title', 'metaDataDescription'],
})
