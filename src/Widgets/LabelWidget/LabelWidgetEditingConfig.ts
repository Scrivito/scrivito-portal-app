import { provideEditingConfig } from 'scrivito'
import { LabelWidget } from './LabelWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(LabelWidget, {
  title: 'Label',
  thumbnail: classNameToThumbnail('LabelWidget'),
  properties: ['valueSize'],
  initialContent: {
    label: 'Label',
    value: 'Value',
    valueSize: 'body-font-size',
  },
})
