import { provideWidgetClass } from 'scrivito'

export const BannerHeadlineContainerWidget = provideWidgetClass(
  'BannerHeadlineContainerWidget',
  {
    attributes: {
      design: 'design',
      headlines: ['widgetlist', { only: 'BannerHeadlineWidget' }],
    },
    extractTextAttributes: ['headlines'],
  },
)
