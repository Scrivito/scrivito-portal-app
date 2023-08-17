import { provideEditingConfig } from 'scrivito'
import { BannerHeadlineContainerWidget } from './BannerHeadlineContainerWidgetClass'
import { BannerHeadlineWidget } from '../BannerHeadlineWidget/BannerHeadlineWidgetClass'

provideEditingConfig(BannerHeadlineContainerWidget, {
  title: 'Banner headlines',
  initialContent: {
    headlines: [
      new BannerHeadlineWidget({
        style: 'h2',
        backgroundColor: 'white',
        headline: 'Lorem ipsum',
      }),
    ],
  },
})
