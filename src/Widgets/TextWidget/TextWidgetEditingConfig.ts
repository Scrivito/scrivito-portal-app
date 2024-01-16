import { provideEditingConfig } from 'scrivito'
import { TextWidget } from './TextWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(TextWidget, {
  title: 'Text',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    text: {
      title: 'Content',
    },
  },
  properties: ['alignment', 'text'],
  initialContent: {
    alignment: 'left',
    text: 'Text',
  },
})
