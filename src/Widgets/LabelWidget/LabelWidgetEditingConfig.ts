import { provideEditingConfig } from 'scrivito'
import { LabelWidget } from './LabelWidgetClass'

provideEditingConfig(LabelWidget, {
  title: 'Label',
  properties: ['valueSize'],
  initialContent: {
    label: 'Label',
    value: 'Value',
    valueSize: 'body-font-size',
  },
})
