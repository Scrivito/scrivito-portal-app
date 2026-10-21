import { provideWidgetClass } from 'scrivito'

export const BannerHeadlineContainerWidget = provideWidgetClass(
  'BannerHeadlineContainerWidget',
  {
    attributes: {
      design: ['design', { preset: 'container' }],
      headlines: ['widgetlist', { only: 'BannerHeadlineWidget' }],
    },
    extractTextAttributes: ['headlines'],
  },
)
