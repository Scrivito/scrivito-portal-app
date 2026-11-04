import { provideEditingConfig } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'
import { TopNavigationWidget } from '../../Widgets/TopNavigationWidget/TopNavigationWidgetClass'
import { SectionWidget } from '../../Widgets/SectionWidget/SectionWidgetClass'
import { HeadlineWidget } from '../../Widgets/HeadlineWidget/HeadlineWidgetClass'
import { TextWidget } from '../../Widgets/TextWidget/TextWidgetClass'
import { jwtPisaSalesConfigSite } from '../../Data/jwtPisaSalesApiConfig'

provideEditingConfig(Homepage, {
  title: 'Homepage',
  attributes: {
    ...defaultPageEditingConfigAttributes,
    structuredData: {
      options: { multiLine: true },
      title: 'Structured data',
      description:
        'Describes the site and this page for search engines. Written as JSON in the schema.org format, with the nodes in a "@graph", e.g. {"@context": "https://schema.org", "@graph": [{"@type": "Organization", "name": "…"}, {"@type": "WebSite", "name": "…"}]}. The first Organization and the first WebSite are used on all pages. The first of the other nodes describes this page.',
    },
    contentDescription: {
      options: { multiLine: true },
      title: 'Site description',
      description: 'A short summary of what this site is about.',
    },
    contentThumbnail: {
      title: 'Site thumbnail',
      description: 'Image representing the site.',
    },
    contentTitle: {
      title: 'Site name',
    },
    baseUrl: {
      title: 'Base URL',
      description:
        'Under which URL is this site reachable? E.g. "https://www.tynacoon.com/en"',
    },
    jwtPisaSalesApiUrl: {
      title: 'JWT PisaSales API URL',
      description: 'Without trailing slash or "portal" path.',
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
    siteOrganizationLogo: {
      title: 'Organization logo',
      description:
        'Replaces the "logo" of the Organization in the structured data. Should be at least 112x112 px and legible on a white background.',
    },
    siteBorderRadius: {
      title: 'Rounded corners',
      description:
        'Applies to elements such as cards, buttons, and forms throughout the site. Set to 0 to disable rounded corners. Default: 8.5px',
      editor: 'dimensionPicker',
      options: { units: ['px'] },
    },
    siteCartPage: { title: 'Location of cart page' },
    siteColorPrimary: {
      title: 'Primary color',
      description: 'Default: #274486',
      editor: 'colorPicker',
    },
    siteColorSecondary: {
      title: 'Secondary color',
      description: 'Default: #39a9eb',
      editor: 'colorPicker',
    },
    siteColorTextDark: {
      title: 'Dark text',
      description: 'Default: #454545',
      editor: 'colorPicker',
    },
    siteColorTextDarkHeadline: {
      title: 'Dark headline text',
      description: 'Default: #3b3b3b',
      editor: 'colorPicker',
    },
    siteColorTextLight: {
      title: 'Light text',
      description: 'Default: #ffffff',
      editor: 'colorPicker',
    },
    siteColorTextLightHeadline: {
      title: 'Light headline text',
      description: 'Default: #ffffff',
      editor: 'colorPicker',
    },
    siteDropShadow: {
      title: 'Show drop-shadow?',
      description: 'Default: Yes',
    },
    siteRoundedCorners: {
      title: 'Show rounded corners?',
      description: 'Deprecated in favour of “Rounded corners”. Default: Yes',
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
  },
  propertiesGroups: (site) => [
    ...defaultPagePropertiesGroups,
    {
      title: 'Site settings',
      properties: [
        'contentTitle',
        'contentDescription',
        'contentThumbnail',
        'baseUrl',
        ...(site.id() === jwtPisaSalesConfigSite()?.id()
          ? ['jwtPisaSalesApiUrl']
          : []),
        'siteLogoDark',
        'siteFavicon',
        'siteLanguageIcon',
        'siteCartPage',
        'siteSearchResultsPage',
        'siteUserProfilePage',
        'siteDropShadow',
        'siteBorderRadius',
        ...(site.get('siteBorderRadius') ? [] : ['siteRoundedCorners']),
        'siteFacebookAppId',
        'siteTwitterSite',
        'siteSinglePage',
      ],
      key: 'site-settings-group',
    },
    {
      title: 'Structured data',
      properties: [
        'structuredData',
        'structuredDataImages',
        'siteOrganizationLogo',
      ],
      key: 'site-structured-data-group',
    },
    {
      title: 'Colors',
      properties: [
        'siteColorPrimary',
        'siteColorSecondary',
        'siteColorTextDark',
        'siteColorTextDarkHeadline',
        'siteColorTextLight',
        'siteColorTextLightHeadline',
      ],
      key: 'site-colors-group',
    },
    {
      title: 'Fonts',
      properties: [
        'siteFontHeadline',
        'siteFontBody',
        'siteFontHeadlineWeight',
        'siteFontBodyWeight',
      ],
      key: 'site-fonts-group',
    },
  ],
  properties: [...defaultPageProperties],
  initialContent: {
    ...defaultPageInitialContent,
    body: [
      new SectionWidget({
        backgroundColor: 'primary',
        content: [new HeadlineWidget(), new TextWidget()],
      }),
    ],
    contentFormat: 'portal-app:6',
    layoutHeader: [new TopNavigationWidget()],
    layoutShowHeader: true,
    siteBorderRadius: '8.5px',
    siteColorPrimary: '#274486',
    siteColorSecondary: '#39a9eb',
    siteColorTextDark: '#454545',
    siteColorTextDarkHeadline: '#3b3b3b',
    siteColorTextLight: '#ffffff',
    siteColorTextLightHeadline: '#ffffff',
    siteDropShadow: true,
    siteFontBodyWeight: '500',
    siteFontHeadlineWeight: '500',
    siteNotFound: [
      new SectionWidget({
        backgroundColor: 'dark-grey',
        content: [
          new HeadlineWidget({
            headline: 'Page not found',
            level: 'h1',
            margin: 'mb-2',
            style: 'h1',
          }),
          new TextWidget({
            text: '<p>The page you are looking for does not exist.</p>',
          }),
        ],
      }),
    ],
  },
  validations: [
    ...defaultPageValidations,
    [
      '_language',
      (language: string | null, { obj }) => {
        if (!language) {
          return {
            message: 'The language must be set.',
            severity: 'error',
          }
        }

        const duplicates = obj
          .versionsOnAllSites()
          .filter((version) => version.language() === language).length

        if (duplicates > 1) {
          return {
            message: `Multiple homepages exist for language “${language}”. Only one is allowed. Please pick a different language.`,
            severity: 'error',
          }
        }
      },
    ],
  ],
})
