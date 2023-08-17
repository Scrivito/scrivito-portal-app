import { provideEditingConfig } from 'scrivito'
import { PersonCardWidget } from './PersonCardWidgetClass'

provideEditingConfig(PersonCardWidget, {
  title: 'Person card',
  properties: ['person'],
})
