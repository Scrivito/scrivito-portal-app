import { provideWidgetClass } from 'scrivito'

export const BannerHeadlineContainerWidget = provideWidgetClass(
  'BannerHeadlineContainerWidget',
  {
    attributes: {
      headlines: ['widgetlist', { only: 'BannerHeadlineWidget' }],
    },
    extractTextAttributes: ['headlines'],
  },
)
