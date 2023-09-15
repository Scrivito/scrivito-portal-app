import { provideWidgetClass } from 'scrivito'

export const DownloadCardWidget = provideWidgetClass('DownloadCardWidget', {
  attributes: {
    dataItemAttributeName: 'string',
    details: 'string',
    icon: 'string',
    link: 'link',
    linkFromDataItem: 'boolean',
    subTitle: 'string',
    title: 'string',
  },
})
