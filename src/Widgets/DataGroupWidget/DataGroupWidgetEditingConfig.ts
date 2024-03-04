import { provideEditingConfig } from 'scrivito'
import { DataGroupWidget } from './DataGroupWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataGroupWidget, {
  title: 'Data Group',
  thumbnail: Thumbnail,
})
