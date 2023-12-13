import { provideEditingConfig } from 'scrivito'
import { DividerWidget } from './DividerWidgetClass'
import Thumbnail from './thumbnail.svg'


provideEditingConfig(DividerWidget, {
  title: 'Divider',
  thumbnail: Thumbnail,
})
