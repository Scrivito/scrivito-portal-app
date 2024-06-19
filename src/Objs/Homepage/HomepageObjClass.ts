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
    siteFavicon: ['reference', { only: 'Image' }],
    siteFooter: ['widgetlist', { only: 'SectionWidget' }],
    siteHeader: 'widgetlist',
    siteLanguageIcon: ['reference', { only: 'Image' }],
    siteLogoDark: ['reference', { only: 'Image' }],
    siteLogoLight: ['reference', { only: 'Image' }],
    siteNotFound: ['widgetlist', { only: 'SectionWidget' }],
    sitePortalOnlyMode: 'boolean',
    sitePortalOverviewPage: 'reference',
    siteSearchResultsPage: 'reference',
    siteUserProfilePage: 'reference',
  },
  extractTextAttributes: ['body'],
  onlyAsRoot: true,
})

export type HomepageInstance = InstanceType<typeof Homepage>

export function isHomepage(input: unknown): input is HomepageInstance {
  return input instanceof Homepage
}
