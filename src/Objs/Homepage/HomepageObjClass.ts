import { provideObjClass } from 'scrivito'

export const Homepage = provideObjClass('Homepage', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    contentTitle: 'string',
    siteFavicon: ['reference', { only: 'Image' }],
    siteFooter: ['widgetlist', { only: 'SectionWidget' }],
    siteHeader: ['widgetlist', { only: 'SectionWidget' }],
    siteLogoDark: ['reference', { only: 'Image' }],
    siteLogoLight: ['reference', { only: 'Image' }],
    siteNotFound: ['widgetlist', { only: 'SectionWidget' }],
    title: 'string',
  },
  extractTextAttributes: ['body'],
  onlyAsRoot: true,
})
