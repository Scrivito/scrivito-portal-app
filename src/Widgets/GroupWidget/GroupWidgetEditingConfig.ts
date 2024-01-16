import { provideEditingConfig } from 'scrivito'
import { GroupWidget } from './GroupWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(GroupWidget, {
  title: 'Group',
  thumbnail: Thumbnail,
})
