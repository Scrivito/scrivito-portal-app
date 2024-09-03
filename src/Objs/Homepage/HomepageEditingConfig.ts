import { provideEditingConfig } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import { SiteColorsPicker } from './SiteColorsPicker'
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
    linkIcon: {
      title: 'Link icon name',
      description:
        'This icon is shown e.g. when used in a vertical navigation widget. The full list of names can be found at https://icons.getbootstrap.com/',
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
    siteFavicon: {
      title: 'Favicon',
    },
    siteCartPage: { title: 'Location of cart page' },
    siteDropShadow: {
      title: 'Show drop-shadow?',
      description: 'Default: Yes',
    },
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
        site.id() === import.meta.env.SCRIVITO_ROOT_OBJ_ID ? 'pisaUrl' : null,
        'siteLogoDark',
        'siteFavicon',
        'siteLanguageIcon',
        'siteCartPage',
        'siteSearchResultsPage',
        'siteUserProfilePage',
        'siteDropShadow',
        'siteRoundedCorners',
        'siteFacebookAppId',
        'siteTwitterSite',
      ].filter((p): p is string => typeof p === 'string'),
      key: 'site-settings-group',
    },
    {
      title: 'Site colors',
      component: SiteColorsPicker,
      properties: [
        'siteColorPrimary',
        'siteColorPrimaryLighten',
        'siteColorPrimaryDarken',
        'siteColorSecondary',
        'siteColorSecondaryLighten',
        'siteColorSecondaryDarken',
      ],
      key: 'site-colors-group',
    },
    ...defaultPagePropertiesGroups,
  ],
  properties: [...defaultPageProperties, 'linkIcon'],
  initialContent: {
    ...defaultPageInitialContent,
    siteDropShadow: true,
    siteRoundedCorners: true,
  },
  validations: defaultPageValidations,
})
