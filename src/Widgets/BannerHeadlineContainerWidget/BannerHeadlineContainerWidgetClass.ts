import * as Scrivito from 'scrivito'

export const BannerHeadlineContainerWidget = Scrivito.provideWidgetClass(
  'BannerHeadlineContainerWidget',
  {
    attributes: {
      headlines: ['widgetlist', { only: 'BannerHeadlineWidget' }],
    },
    extractTextAttributes: ['headlines'],
  }
)
