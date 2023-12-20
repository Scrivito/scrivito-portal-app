import { provideObjClass } from 'scrivito'

export const Homepage = provideObjClass('Homepage', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    contentTitle: 'string',
    metaDataDescription: 'string',
    siteCartPage: 'reference',
    siteFavicon: ['reference', { only: 'Image' }],
    siteFooter: ['widgetlist', { only: 'SectionWidget' }],
    siteHeader: 'widgetlist',
    siteLogoDark: ['reference', { only: 'Image' }],
    siteLogoLight: ['reference', { only: 'Image' }],
    siteNotFound: ['widgetlist', { only: 'SectionWidget' }],
    sitePortalOverviewPage: 'reference',
    siteSearchResultsPage: 'reference',
    siteUserProfilePage: 'reference',
    title: 'string',
  },
  extractTextAttributes: ['body'],
  onlyAsRoot: true,
})

export type HomepageInstance = InstanceType<typeof Homepage>

export function isHomepage(input: unknown): input is HomepageInstance {
  return input instanceof Homepage
}
