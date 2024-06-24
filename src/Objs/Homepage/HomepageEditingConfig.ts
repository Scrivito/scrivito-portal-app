import { provideEditingConfig } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'

provideEditingConfig(Homepage, {
  title: 'Homepage',
  attributes: {
    ...defaultPageEditingConfigAttributes,
    contentTitle: {
      title: 'Site name',
    },
    baseUrl: {
      title: 'Base URL',
      description:
        'Under which URL is this site reachable? E.g. "https://www.tynacoon.com/en"',
    },
    pisaUrl: {
      title: 'PisaSales Portal API URL',
    },
    siteFacebookAppId: { title: 'Facebook app ID' },
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
    sitePortalOnlyMode: { title: 'Use portal-only mode?' },
    siteCartPage: { title: 'Location of cart page' },
    siteDropShadow: {
      title: 'Show drop-shadow?',
      description: 'Default: Yes',
    },
    sitePortalOverviewPage: { title: 'Location of portal overview page' },
    siteRoundedCorners: {
      title: 'Show rounded corners?',
      description: 'Default: Yes',
    },
    siteSearchResultsPage: {
      title: 'Location of search results page',
    },
    siteTwitterSite: {
      title: 'Twitter site',
      description: 'Needs to be approved at https://cards-dev.x.com/validator',
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
        'siteDropShadow',
        'siteRoundedCorners',
        'siteFacebookAppId',
        'siteTwitterSite',
      ].filter((p): p is string => typeof p === 'string'),
      key: 'site-settings-group',
    },
    ...defaultPagePropertiesGroups,
  ],
  properties: defaultPageProperties,
  initialContent: {
    ...defaultPageInitialContent,
    siteDropShadow: true,
    siteRoundedCorners: true,
  },
  validations: defaultPageValidations,
})
