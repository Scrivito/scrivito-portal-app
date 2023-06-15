import * as Scrivito from 'scrivito'
import { LabelWidget } from './LabelWidgetClass'

Scrivito.provideEditingConfig(LabelWidget, {
  title: 'Label',
  properties: ['valueSize'],
  initialContent: {
    label: 'Label',
    value: 'Value',
    valueSize: 'body-font-size',
  },
})
