import { provideWidgetClass } from 'scrivito'

export const DownloadCardWidget = provideWidgetClass('DownloadCardWidget', {
  attributes: {
    details: 'string',
    icon: 'string',
    link: 'link',
    subTitle: 'string',
    title: 'string',
  },
})
