import * as Scrivito from 'scrivito'
import { PersonCardWidget } from './PersonCardWidgetClass'

Scrivito.provideEditingConfig(PersonCardWidget, {
  title: 'Person card',
  properties: ['person'],
})
