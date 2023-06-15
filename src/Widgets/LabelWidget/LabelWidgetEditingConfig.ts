import * as Scrivito from 'scrivito'
import { LabelWidget } from './LabelWidgetClass'

Scrivito.provideEditingConfig(LabelWidget, {
  title: 'Label',
  properties: ['valueSize'],
  initialContent: {
    valueSize: 'body-font-size',
  },
})
