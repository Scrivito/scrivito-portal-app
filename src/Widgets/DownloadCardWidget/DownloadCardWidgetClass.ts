import { provideWidgetClass } from 'scrivito'

export const DownloadCardWidget = provideWidgetClass('DownloadCardWidget', {
  attributes: {
    design: 'design',
    details: 'string',
    icon: 'string',
    link: 'link',
    label: 'string',
    subtitle: 'string',
    title: 'string',
  },
  extractTextAttributes: ['title', 'subtitle', 'details'],
})
