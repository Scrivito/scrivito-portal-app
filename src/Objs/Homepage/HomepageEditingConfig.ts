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
    siteFontBody: {
      title: 'Body font',
      description:
        'Ensure you have a proper license for the selected font. Default: Manrope',
    },
    siteFontBodyWeight: {
      title: 'Body font weight',
      description:
        'If your chosen font supports multiple weights, pick the one that best fits your design. Default: 500',
    },
    siteFontHeadline: {
      title: 'Headline font',
      description: `This font will also be applied to navigation menus and buttons.
        Ensure you have a proper license for the selected font.
        Default: Firava`,
    },
    siteFontHeadlineWeight: {
      title: 'Headline font weight',
      description:
        'If your chosen font supports multiple weights, pick the one that best fits your design. Default: 500',
    },
    siteSinglePage: {
      title: 'Single page site',
      description:
        'If activated, only the selected page will be accessible, even for logged-in users. All other pages will display a 404 not found page.',
    },
    languageToolsPrompt: {
      title: 'Assistant Noam',
      description:
        'Site specific instructions. For example, title case conventions or tone-of-voice.',
      options: { multiLine: true, showHtmlSource: false },
    },
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
        'siteSinglePage',
      ].filter((p): p is string => typeof p === 'string'),
      key: 'site-settings-group',
    },
    {
      title: 'Site colors',
      component: SiteColorsPicker,
      properties: ['siteColorPrimary', 'siteColorSecondary'],
      key: 'site-colors-group',
    },
    {
      title: 'Site fonts',
      properties: [
        'siteFontHeadline',
        'siteFontBody',
        'siteFontHeadlineWeight',
        'siteFontBodyWeight',
      ],
      key: 'site-fonts-group',
    },
    {
      title: 'Site guidelines',
      properties: ['languageToolsPrompt'],
      key: 'language-tools-prompt-group',
    },
    ...defaultPagePropertiesGroups,
  ],
  properties: [...defaultPageProperties],
  initialContent: {
    ...defaultPageInitialContent,
    siteDropShadow: true,
    siteFontBodyWeight: '500',
    siteFontHeadlineWeight: '500',
    siteRoundedCorners: true,
  },
  validations: defaultPageValidations,
})
