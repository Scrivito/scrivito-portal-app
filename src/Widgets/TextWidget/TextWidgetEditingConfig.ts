import { provideEditingConfig } from 'scrivito'
import { TextWidget } from './TextWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(TextWidget, {
  title: 'Text',
  thumbnail: Thumbnail,
  attributes: {
    text: {
      title: 'Content',
    },
  },
  properties: ['text'],
  initialContent: {
    text: 'Text',
  },
})
