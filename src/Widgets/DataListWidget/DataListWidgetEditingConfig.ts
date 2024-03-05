import { provideEditingConfig } from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataListWidget, {
  title: 'Data List',
  thumbnail: Thumbnail,
})
