import { provideEditingConfig } from 'scrivito'
import { DataMessageWidget } from './DataMessageWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataMessageWidget, {
  title: 'Data Message',
  thumbnail: Thumbnail,
})
