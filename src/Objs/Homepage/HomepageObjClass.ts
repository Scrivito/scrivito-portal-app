import { provideObjClass } from 'scrivito'
import { defaultPageAttributes } from '../defaultPageAttributes'

export const Homepage = provideObjClass('Homepage', {
  attributes: {
    ...defaultPageAttributes,
    baseUrl: 'stringlist',
    body: 'widgetlist',
    contentTitle: 'string',
    pisaUrl: 'string',
    siteCartPage: 'reference',
    siteColorPrimary: 'string',
    siteColorPrimaryDarken: 'string',
    siteColorPrimaryLighten: 'string',
    siteColorSecondary: 'string',
    siteColorSecondaryDarken: 'string',
    siteColorSecondaryLighten: 'string',
    siteDropShadow: 'boolean',
    siteFacebookAppId: 'string',
    siteFavicon: ['reference', { only: 'Image' }],
    siteFooter: ['widgetlist', { only: 'SectionWidget' }],
    siteHeader: 'widgetlist',
    siteLanguageIcon: ['reference', { only: 'Image' }],
    siteLogoDark: ['reference', { only: 'Image' }],
    siteNotFound: ['widgetlist', { only: 'SectionWidget' }],
    siteRoundedCorners: 'boolean',
    siteSearchResultsPage: 'reference',
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
