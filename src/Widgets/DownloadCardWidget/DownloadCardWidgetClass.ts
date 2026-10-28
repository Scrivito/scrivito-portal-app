import { provideWidgetClass } from 'scrivito'

export const DownloadCardWidget = provideWidgetClass('DownloadCardWidget', {
  attributes: {
    design: 'design',
    // The card is a surface of its own, below the label the widget's design styles.
    cardDesign: 'design',
    details: 'string',
    icon: 'string',
    link: 'link',
    label: 'string',
    subtitle: 'string',
    title: 'string',
  },
  extractTextAttributes: ['title', 'subtitle', 'details'],
})
