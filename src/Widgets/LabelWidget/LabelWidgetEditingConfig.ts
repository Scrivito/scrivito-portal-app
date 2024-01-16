import { provideEditingConfig } from 'scrivito'
import { LabelWidget } from './LabelWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(LabelWidget, {
  title: 'Label',
  thumbnail: Thumbnail,
  properties: ['valueSize'],
  initialContent: {
    label: 'Label',
    value: 'Value',
    valueSize: 'body-font-size',
  },
})
