import { provideEditingConfig } from 'scrivito'
import { DataEmptyWidget } from './DataEmptyWidgetClass'
import Thumbnail from './thumbnail.svg'
import { TextWidget } from '../TextWidget/TextWidgetClass'

provideEditingConfig(DataEmptyWidget, {
  title: 'Data Empty',
  thumbnail: Thumbnail,
  initialContent: {
    content: [new TextWidget({ text: '<p>No data available.</p>' })],
  },
})
