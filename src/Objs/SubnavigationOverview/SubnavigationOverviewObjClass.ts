import { provideObjClass } from 'scrivito'
import { defaultPageAttributes } from '../defaultPageAttributes'

export const SubnavigationOverview = provideObjClass('SubnavigationOverview', {
  attributes: {
    ...defaultPageAttributes,
    body: 'widgetlist',
    hideInNavigation: 'boolean',
    linkIcon: 'string',
    topBannerBackground: ['reference', { only: ['Image'] }],
  },
  extractTextAttributes: ['body'],
})
