import { provideEditingConfig } from 'scrivito'
import { DataWidget } from './DataWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataWidget, {
  title: 'Data',
  thumbnail: Thumbnail,
})
