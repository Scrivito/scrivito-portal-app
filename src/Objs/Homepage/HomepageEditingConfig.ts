import { Obj, provideEditingConfig } from 'scrivito'
import { Homepage } from './HomepageObjClass'
import { SiteColorsPicker } from './SiteColorsPicker'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'
import { isFont } from '../Font/FontObjClass'

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
        'Please ensure that you have an appropriate license for the selected font. Default: "Manrope"',
    },
    siteFontBodyWeight: {
      title: 'Body weight',
      description: 'Default: 500',
    },
    siteFontHeadline: {
      title: 'Headline font',
      description: `Please ensure that you have an appropriate license for the selected font.
        This font is also used in the navigation and for buttons.
        Default: "Fira Sans"`,
    },
    siteFontHeadlineWeight: {
      title: 'Headline weight',
      description: 'Default: 500',
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
    {
      title: 'Site fonts',
      properties: [
        'siteFontHeadline',
        'siteFontHeadlineWeight',
        'siteFontBody',
        'siteFontBodyWeight',
      ],
      key: 'site-fonts-group',
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
  validations: [
    ...defaultPageValidations,
    [
      'siteFontHeadline',
      (objs: Obj[]) => {
        const familyNames = uniqueFamilyNames(objs)
        if (familyNames.length <= 1) return

        return {
          message: `Headline font family names need to be equal. Current family names: ${Array.from(familyNames).join(', ')}`,
          severity: 'error',
        }
      },
    ],
    [
      'siteFontBody',
      (objs: Obj[]) => {
        const familyNames = uniqueFamilyNames(objs)
        if (familyNames.length <= 1) return

        return {
          message: `Body font family names need to be equal. Current family names: ${Array.from(familyNames).join(', ')}`,
          severity: 'error',
        }
      },
    ],
  ],
})

function uniqueFamilyNames(objs: Obj[]): string[] {
  return Array.from(
    new Set(objs.filter(isFont).map((font) => font.get('family'))),
  )
}
