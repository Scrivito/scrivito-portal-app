import { provideEditingConfig } from 'scrivito'
import { BannerHeadlineContainerWidget } from './BannerHeadlineContainerWidgetClass'
import { BannerHeadlineWidget } from '../BannerHeadlineWidget/BannerHeadlineWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(BannerHeadlineContainerWidget, {
  title: 'Banner Headlines',
  thumbnail: Thumbnail,
    initialContent: {
    headlines: [
      new BannerHeadlineWidget({
        style: 'h2',
        backgroundColor: 'white',
        headline: 'Headline',
      }),
    ],
  },
})
