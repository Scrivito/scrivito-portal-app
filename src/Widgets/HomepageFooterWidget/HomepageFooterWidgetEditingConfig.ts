import { provideEditingConfig } from 'scrivito'
import { HomepageFooterWidget } from './HomepageFooterWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(HomepageFooterWidget, {
  thumbnail: Thumbnail,
  title: 'Homepage Footer',
})
