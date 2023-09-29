import { provideEditingConfig } from 'scrivito'
import { BannerHeadlineContainerWidget } from './BannerHeadlineContainerWidgetClass'
import { BannerHeadlineWidget } from '../BannerHeadlineWidget/BannerHeadlineWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(BannerHeadlineContainerWidget, {
  title: 'Banner Headlines',
  thumbnail: classNameToThumbnail('BannerHeadlineContainerWidget'),
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
