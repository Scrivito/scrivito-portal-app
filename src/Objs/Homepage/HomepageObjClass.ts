import * as Scrivito from 'scrivito'

export const Homepage = Scrivito.provideObjClass('Homepage', {
  attributes: {
    body: ['widgetlist', { only: 'SectionWidget' }],
    childOrder: 'referencelist',
    contentTitle: 'string',
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
