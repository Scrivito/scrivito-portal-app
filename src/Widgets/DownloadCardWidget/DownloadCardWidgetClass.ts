import { provideWidgetClass } from 'scrivito'

export const DownloadCardWidget = provideWidgetClass('DownloadCardWidget', {
  attributes: {
    details: 'string',
    icon: 'string',
    link: 'link',
    subtitle: 'string',
    title: 'string',
  },
})
