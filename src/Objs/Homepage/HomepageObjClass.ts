import { provideObjClass } from 'scrivito'
import { defaultPageAttributes } from '../defaultPageAttributes'

export const Homepage = provideObjClass('Homepage', {
  attributes: {
    ...defaultPageAttributes,
    baseUrl: 'stringlist',
    body: 'widgetlist',
    contentFormat: 'string',
    contentTitle: 'string',
    jwtPisaSalesApiUrl: 'string',
    siteBorderRadius: 'string',
    siteCartPage: 'reference',
    siteColorPrimary: 'string',
    siteColorSecondary: 'string',
    siteColorTextDark: 'string',
    siteColorTextDarkHeadline: 'string',
    siteColorTextLight: 'string',
    siteColorTextLightHeadline: 'string',
    siteDropShadow: 'boolean',
    siteFacebookAppId: 'string',
    siteFavicon: ['reference', { only: 'Image' }],
    siteFontBody: ['referencelist', { only: 'Font' }],
    siteFontBodyWeight: [
      'enum',
      {
        values: ['300', '400', '500', '600', '700', '800'],
      },
    ],
    siteFontHeadline: ['referencelist', { only: 'Font' }],
    siteFontHeadlineWeight: [
      'enum',
      {
        values: ['300', '400', '500', '600', '700', '800'],
      },
    ],
    siteFooter: ['widgetlist', { only: 'SectionWidget' }],
    siteHeader: 'widgetlist',
    siteLanguageIcon: ['reference', { only: 'Image' }],
    siteLogoDark: ['reference', { only: 'Image' }],
    siteNotFound: ['widgetlist', { only: 'SectionWidget' }],
    siteRoundedCorners: 'boolean', // deprecated by siteBorderRadius
    siteSearchResultsPage: 'reference',
    siteSinglePage: 'reference',
    siteTwitterSite: 'string',
    siteUserProfilePage: 'reference',
  },
  extractTextAttributes: ['body'],
  onlyAsRoot: true,
})

export type HomepageInstance = InstanceType<typeof Homepage>

export function isHomepage(input: unknown): input is HomepageInstance {
  return input instanceof Homepage
}
